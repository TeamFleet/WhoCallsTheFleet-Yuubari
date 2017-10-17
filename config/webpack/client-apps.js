// 客户端打包项目列表
// 可返回: string, object, [string], [object]
// 默认 webpack 逻辑下，项目必须位于 /apps 目录下

/* string
 * 仅打包单一项目，仅提供项目名称
 * 
 * module.exports = 'app'
 */

/* object
 * 仅打包单一项目，提供详细选项
 * 
 * module.exports = {
 *      app: 'app',
 *      ...settings
 * }
 */

/* [string], [object]
 * 打包多个项目，array 中每个元素类型均可为 string 或 string
 * 
 * module.exports = [
 *      'app-1',
 *      {
 *          app: 'app-2',
 *          pwa: false,
 *          'client-dist': {
 *              output: {
 *                  filename: `[name].custom.js`
 *              }
 *              plugins: {
 *                  ...newPlugins
 *              }
 *          }
 *      }
 * ]
 */

/* 项目详细选项
 *
 * app  string  项目名称
 * pwa  boolean|function  仅针对dist。是否启用PWA，如果为true则启用默认service-worker，否则请提供webpack插件函数，参见/system/webpack/client/dist.js
 * spaHtmlTitle  string  仅针对spa。SPA模板页面默认标题
 * spaFileName  string  仅针对spa。SPA页面文件名，可为相对outputPath的路径
 * spaTemplatePath  string  仅针对spa。SPA模板文件位置
 * [`${process.env.WEBPACK_STAGE_MODE}-${process.env.WEBPACK_BUILD_ENV}`]
 *      object
 *      为对应的打包类型扩展配置
 */

// const fs = require('fs-extra')
const path = require('path')
const pwaCreatePlugin = require('sp-pwa')
// const WebpackOnBuildPlugin = require('on-build-webpack')

const appPath = process.cwd()
const outputPath = require('./output-path')

const pluginCopyImages = require('./lib/plugin-copy-images')

module.exports = (async () => (
    [{
        app: 'app',

        pwa: pwaCreatePlugin({
            outputPath: path.resolve(outputPath, `public/app/`, '../'),
            outputFilename: `service-worker.app.js`,
            // customServiceWorkerPath: path.normalize(appPath + '/src/client/custom-service-worker.js'),
            globPattern: `/app/**/*`,
            globOptions: {
                ignore: [
                    '/**/_*/',
                    '/**/_*/**/*'
                ]
            },
            // appendUrls: getUrlsFromRouter()
            appendUrls: []
        }),

        spaHtmlTitle: 'WhoCallsTheFleet',
        spaFileName: process.env.WEBPACK_BUILD_ENV === 'electron' ? 'index.html' : '../index.html',
        // spaTemplatePath: path.resolve(process.cwd(), `./apps/app/html.ejs`),

        'client-dev': {
            plugins: [
                ...await pluginCopyImages(appPath, 'app', true)
            ]
        },
        'client-dist': {
            plugins: [
                ...await pluginCopyImages(appPath, 'app', false)
            ]
        },
        'client-spa': {
            plugins: [
                ...await pluginCopyImages(appPath, 'app', false, true),
            ]
        },
        // 'server-dev': {},
        // 'server-dist': {},
    }]
))()