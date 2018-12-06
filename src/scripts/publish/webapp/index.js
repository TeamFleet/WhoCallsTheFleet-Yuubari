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

    // npm run build

    // git commit & push
}

publishWebApp()
