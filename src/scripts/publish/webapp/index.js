const path = require('path')
const spinner = require('../../commons/spinner')

/**
 * 发布: WebApp
 * @async
 */
const publishWebApp = async () => {
    /** @type {String} 打包结果路径 */
    const dist = (() => {
        const { dist } = require('../../../../koot.config')

        if (path.isAbsolute(dist))
            return dist

        return path.resolve(__dirname, '../../../../', dist)
    })()

    // npm run build
    await new Promise(resolve => {
        const child = require('child_process').spawn(
            'npm',
            ['run', 'build'],
            {
                stdio: 'inherit',
                shell: true,
            }
        )
        child.on('close', () => {
            resolve()
        })
    })

    // git commit & push
    const waiting = spinner('Git committing & pushing...')
    const git = require('simple-git/promise')(dist)
    await git.add('./*')
    await git.commit(`New build ${(new Date()).toISOString()}`)
    await git.push('origin', 'master')
    waiting.finish()
}

publishWebApp()
