/* eslint-disable no-console */

const inquirer = require('inquirer');
const { spawn } = require('koot-cli-kit');

async function run() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select command',
            choices: [
                {
                    name: 'Start development environment',
                    value: 'dev',
                },
                {
                    name: 'Build & run production server',
                    value: 'start:local',
                },
                {
                    name: 'Deploy',
                    value: 'deploy',
                },
            ],
        },
    ]);

    await spawn(`npm run ${choice}`, {}).catch((err) => {
        throw err;
    });
}

run().catch(console.trace);
