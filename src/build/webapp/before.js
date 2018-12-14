const fs = require('fs-extra')
const path = require('path')
const spinner = require('../../scripts/commons/spinner')

/** @type {Boolean} 标记流程是否已运行 */
let complete = false

const webappBefore = async (data = {}) => {
    let { dist } = data
    if (!dist) {
        dist = (() => {
            const { dist } = require('../../../koot.config')

            if (path.isAbsolute(dist))
                return dist

            return path.resolve(__dirname, '../../../', dist)
        })()
    }

    if (complete) return
    if (process.env.WEBPACK_BUILD_ENV !== 'prod') {
        complete = true
        return
    }

    const channel = require('../../channel')
    const repoPath = (() => {
        if (channel === 'yuubari')
            return 'git@github.com:TeamFleet/yuubari-server.git'
        return ''
    })()
    const isDistRepo = fs.existsSync(dist) && fs.existsSync(path.resolve(dist, '.git'))
    const step = '准备打包结果目录'
    const waiting = spinner(step + '...')

    // 如果目标路径存在但不是 git 项目，删除，git clone
    if (!isDistRepo) {
        await fs.remove(dist)
        await fs.ensureDir(dist)
        const git = require('simple-git/promise')(dist)
        await git.clone(repoPath, dist)
            .catch(err => {
                waiting.error(err)
            })
    }

    const git = require('simple-git/promise')(dist)

    /** @type {Boolean} 是否有 git repo 操作权限 */
    const hasGitAccess = await (async () => {
        let err

        git.silent(true)

        await git.push('origin', 'master')
            .catch(e => {
                err = e
            })

        git.silent(false)

        if (err instanceof Error) err = err.message
        if (typeof err === 'string')
            return !/permission.+denied/i.test(err)

        return true
    })()

    if (hasGitAccess) {
        // 如果有操作权限，git pull
        await git.reset('hard')
        await git.clean('f')
        await git.pull()
    }

    waiting.stop()
    // spinner(step).succeed()
    complete = true
}

if (!module || !module.parent)
    webappBefore({ dist: path.resolve(__dirname, '../../../', 'dist-webapp') })
else
    module.exports = webappBefore
