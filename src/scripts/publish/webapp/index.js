const fs = require('fs-extra')
const path = require('path')

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

    // 复制文件
    const from = path.resolve(__dirname, 'files')
    for (let filename of fs.readdirSync(from)) {
        await fs.copyFile(
            path.resolve(from, filename),
            path.resolve(dist, filename)
        )
    }

    // git commit & push
}

publishWebApp()
