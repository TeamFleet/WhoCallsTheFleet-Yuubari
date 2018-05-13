// const git = require("simple-git")
const npmRunScript = require('npm-run-script')
const spinner = require('./scripts/commons/spinner')

const run = async () => {

    // console.log(__dirname)

    // const repo = git(__dirname)

    // const gitPull = (thisRepo = repo) => {
    //     return new Promise((resolve) => {
    //         thisRepo.pull(function () {
    //             resolve()
    //         })
    //     })
    // }

    const runScript = (cmd, name) => {
        const waiting = spinner(name)
        return new Promise((resolve, reject) => {
            const child = npmRunScript(cmd, {
                stdio: 'ignore' // quiet
            })
            child.once('error', (error) => {
                process.exit(1)
                reject(error)
            })
            child.once('exit', (exitCode) => {
                // process.exit(exitCode)
                resolve(exitCode)
            });
        }).then(() => waiting.succeed())
    }

    // gitPull().then(() => {
    //     console.log('[GIT] pull - complete')
    //     return true
    // })

    await runScript('npm install --no-save --only=production', 'NPM installing...')
    await runScript('npm run build', 'Building...')
    await runScript('pm2 stop yuubari', 'Stopping server process...')
    await runScript('npm run start:server:pm2', 'Starting server process...')

    // console.log('ALL DONE!')
    npmRunScript('pm2 list')
}

run()