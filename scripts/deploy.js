/* eslint-disable no-console */
const confirmTimeout = require('koot/libs/prompt-timeout');
const { spawn } = require('koot-cli-kit');
const chalk = require('chalk');
const inquirer = require('inquirer');
const terminate = require('terminate');
const notifier = require('node-notifier');
const spinner = require('./utils/spinner');

async function run() {
    let spinnerDeploying,
        deDeploy = false,
        procServer;

    if (
        await confirmTimeout(
            {
                message: 'Rebuild?',
                suffix: ' (Yes after 10 seconds)',
                default: true,
            },
            10 * 1000
        )
    ) {
        // process.env.KOOT_COMMAND_START = JSON.stringify(true);
        const waiting = spinner('Rebuilding...');
        await spawn(`npm run build`, {
            stdio: 'ignore',
        }).catch((err) => {
            waiting.fail();
            throw err;
        });
        waiting.succeed();
    }

    {
        let prompt;
        const waiting = spinner('Starting local server...');
        procServer = require('child_process').spawn(
            'npx',
            ['koot-start', '--no-build'],
            {
                // stdio: 'inherit',
                shell: true,
                cwd: process.cwd(),
                env: {
                    YUUBARI_LOCAL_RUN: 'true',
                },
            }
        );
        procServer.stdout.on('data', (data) => {
            const r = /listening.+?port.+?([0-9]*m*)([0-9]+).*?/.exec(data);
            if (Array.isArray(r)) {
                waiting.succeed();
                spinner(
                    `Please visit ${chalk.cyanBright(
                        `http://localhost:${r[2]}`
                    )} for inspection`
                ).info();

                prompt = inquirer.prompt({
                    name: 'deploy',
                    message: 'Deploy?',
                    type: 'confirm',
                    default: true,
                });
                prompt.then(({ deploy }) => {
                    deDeploy = deploy;
                    if (deploy) spinnerDeploying = spinner('Deploying...');
                    terminate(procServer.pid);
                });
            }
        });
        procServer.stderr.on('data', (data) => {
            waiting.fail();
            throw new Error(data);
        });
        procServer.on('close', async (code) => {
            // console.log(`child process exited with code ${code}`);
            if (!deDeploy) return;

            const { dist } = require('../koot.config');
            try {
                const git = require('simple-git/promise')(dist);
                await git.add('./*');
                await git.commit(`New build ${new Date().toISOString()}`);
                await git.push('origin', 'master');
            } catch (err) {
                spinnerDeploying.fail();
                throw err;
            }
            spinnerDeploying.succeed();

            // notify
            notifier.notify({
                title: 'The Fleet',
                message: 'Deploy web-app complete!',
            });
        });
    }

    // console.log(child);
    const exitHandler = async (options = {}) => {
        try {
            terminate(procServer.pid);
        } catch (e) {}
    };
    // 在脚本进程关闭/结束时，同时关闭打开的 PM2 进程
    process.stdin.resume();
    // do something when app is closing
    process.on('exit', exitHandler);
    // catches ctrl+c event
    process.on('SIGINT', exitHandler);
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler);
    process.on('SIGUSR2', exitHandler);
    // catches uncaught exceptions
    process.on('uncaughtException', exitHandler);
}

run().catch(console.trace);
