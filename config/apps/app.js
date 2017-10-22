const path = require('path')
const appRunPath = process.cwd()

const pathBase = path.resolve(appRunPath, './apps/app')

module.exports = {

    // 
    domain: require(path.resolve(pathBase, './config/site')).domain,
    server: global.NOT_WEBPACK_RUN ? require(path.resolve(pathBase, './server')).default : '',

    //
    webpack: {
        client: {
            entry: {
                'critical-extra-old-ie': [
                    'babel-polyfill',
                    path.resolve(pathBase, './client/critical.extra-old-ie.js')
                ],
                critical: [
                    path.resolve(pathBase, './client/critical.js')
                ],
                client: [
                    path.resolve(pathBase, './client/index.js')
                    // '../../apps/app/client/index.spa.js'
                ]
            },
            output: {
                filename: `[name].[chunkhash].js`,
                chunkFilename: `chunk.[name].[chunkhash].js`,
                path: path.resolve(appRunPath, `dist-web/public/app/`),
                publicPath: '/app/'
            },
            module: {
                rules: [{
                    test: /\.md$/,
                    include: [
                        path.resolve(appRunPath, './apps/app/docs')
                    ],
                    loader: 'raw-loader'
                }]
            },
            resolve: {
                alias: {
                    // 目录别名，不用的项目可以删除
                    '@apps': path.resolve(appRunPath, './apps'),

                    '@app': pathBase,
                    '@appConfig': path.resolve(pathBase, './config'),
                    '@appUtils': path.resolve(pathBase, './utils'),
                    '@appUI': path.resolve(pathBase, './client/ui'),
                    '@appLogic': path.resolve(pathBase, './client/logic'),
                    "@appData": path.resolve(pathBase, './data'),

                    '@appAssets': path.resolve(appRunPath, './assets'),
                    '@appLocales': path.resolve(appRunPath, './locales'),
                    '@appDocs': path.resolve(appRunPath, './docs'),
                }
            }
        }
    }
}