// 扩展 webpack 配置的 resolve 属性

const path = require('path')
const appPath = process.cwd()

module.exports = {
    alias: {
        // 目录别名，不用的项目可以删除
        '@apps': path.resolve(appPath, './apps'),

        '@app': path.resolve(appPath, './apps/app'),
        '@appConfig': path.resolve(appPath, './apps/app/config'),
        '@appLocales': path.resolve(appPath, './locales'),
        '@appUtils': path.resolve(appPath, './apps/app/utils'),
        '@appAssets': path.resolve(appPath, './assets'),
        '@appUI': path.resolve(appPath, './apps/app/client/ui'),
        '@appLogic': path.resolve(appPath, './apps/app/client/logic'),
        '@appDocs': path.resolve(appPath, './docs'),
        "@appData": path.resolve(appPath, './apps/app/data'),
    }
}