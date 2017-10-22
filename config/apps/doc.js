const path = require('path')
const appRunPath = process.cwd()
module.exports = {

    // 
    domain: require('../../apps/doc/config/site').domain,
    server: global.NOT_WEBPACK_RUN ? require('../../apps/doc/server').default : '',

    //
    webpack: {
        client: [{
            entry: {
                'critical-extra-old-ie': [
                    'babel-polyfill',
                    path.resolve(appRunPath, './apps/doc/client/critical.extra-old-ie.js')
                ],
                critical: [
                    path.resolve(appRunPath, './apps/doc/client/critical.js')
                ],
                client: [
                    path.resolve(appRunPath, './apps/doc/client/index.js')
                ]
            },
            output: {
                filename: `[name].[chunkhash].js`,
                chunkFilename: `chunk.[name].[chunkhash].js`,
                path: path.resolve(appRunPath, `dist/public/doc/`),
                publicPath: '/doc/'
            },
            module: {
                rules: [{
                    test: /\.md$/,
                    include: [
                        path.resolve(appRunPath, './apps/doc/docs')
                    ],
                    loader: 'raw-loader'
                }]
            },
            plugins: [
                'default',
                {
                    'pwa': {
                        
                    }
                },
                []
            ],
            resolve: {
                alias: {
                    // 目录别名，不用的项目可以删除
                    '@apps': path.resolve(appRunPath, './apps'),

                    '@doc': path.resolve(appRunPath, './apps/doc'),
                    '@docConfig': path.resolve(appRunPath, './apps/doc/config'),
                    '@docLocales': path.resolve(appRunPath, './apps/doc/locales'),
                    '@docUtils': path.resolve(appRunPath, './apps/doc/utils'),
                    '@docAssets': path.resolve(appRunPath, './apps/doc/client/assets'),
                    '@docUI': path.resolve(appRunPath, './apps/doc/client/ui'),
                    '@docLogic': path.resolve(appRunPath, './apps/doc/client/logic'),
                    '@docDocs': path.resolve(appRunPath, './apps/doc/docs')
                }
            },
            __ext: {
                dev: {},
                dist: {}
            }
        }, {
            spa: true,
            htmlPath: '../index.html',
            entry: {
                'critical-extra-old-ie': [
                    'babel-polyfill',
                    path.resolve(appRunPath, './apps/doc/client/critical.extra-old-ie.js')
                ],
                critical: [
                    path.resolve(appRunPath, './apps/doc/client/critical.js')
                ],
                client: [
                    path.resolve(appRunPath, './apps/doc/client/index.spa.js')
                ]
            },
            output: {
                filename: `[name].[chunkhash].js`,
                chunkFilename: `chunk.[name].[chunkhash].js`,
                path: path.resolve(appRunPath, `dist-spa/doc/includes/`),
                publicPath: './includes/'
            },
            module: {
                rules: [{
                    test: /\.md$/,
                    include: [
                        path.resolve(appRunPath, './apps/doc/docs')
                    ],
                    loader: 'raw-loader'
                }]
            },
            resolve: {
                alias: {
                    // 目录别名，不用的项目可以删除
                    '@apps': path.resolve(appRunPath, './apps'),

                    '@doc': path.resolve(appRunPath, './apps/doc'),
                    '@docConfig': path.resolve(appRunPath, './apps/doc/config'),
                    '@docLocales': path.resolve(appRunPath, './apps/doc/locales'),
                    '@docUtils': path.resolve(appRunPath, './apps/doc/utils'),
                    '@docAssets': path.resolve(appRunPath, './apps/doc/client/assets'),
                    '@docUI': path.resolve(appRunPath, './apps/doc/client/ui'),
                    '@docLogic': path.resolve(appRunPath, './apps/doc/client/logic'),
                    '@docDocs': path.resolve(appRunPath, './apps/doc/docs')
                }
            }
        }]
    }
}