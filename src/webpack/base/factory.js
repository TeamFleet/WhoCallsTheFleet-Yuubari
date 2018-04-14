const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const {
    root: pathRoot,
    assets: pathAssets,
    bgimgs: pathBgimgs,
    nodeModules: pathNodeModules,
    src: {
        _: pathSrc,
        ui: pathUI,
    }
} = require('../../directories')

const useSpCssLoader = 'sp-css-loader?length=8&mode=replace'
const useUniversalAliasLoader = {
    loader: "universal-alias-loader",
    options: {
        alias: {
            "~base.less": pathUI + '/base.less',
            "~Assets": pathAssets,
            "~/": pathUI + '//'
        }
    }
}

const channel = require('../../channel')

module.exports = (options = {}) => {

    const {
        isExtractTextPlugin
    } = options

    return {

        entry: {
            critical: [
                path.resolve(pathSrc, './client/critical.js')
            ],
            "critical-extra-old-ie": [
                "babel-polyfill",
                path.resolve(pathSrc, './client/critical.extra-old-ie.js')
            ],
            // commons: [
            //     'react',
            //     'react-dom',
    
            //     'redux',
            //     'redux-thunk',
            //     'react-redux',
    
            //     'react-router',
            //     'react-router-redux',
    
            //     'react-transition-group',
    
            //     // 'localforage',
            //     'lz-string',
            //     'metas',
            //     'classnames',
            //     'js-cookie',
    
            //     'kckit',
            // ]
        },

        module: {
            rules: [
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },

                // CSS - general
                {
                    test: /\.css$/,
                    exclude: [/\.g\.css$/, /node_modules/],
                    use: [
                        useSpCssLoader,
                        "postcss-loader",
                        useUniversalAliasLoader
                    ]
                    // loader: 'sp-css-loader?length=8&mode=replace!postcss-loader'
                }, {
                    test: /\.less$/,
                    exclude: [/\.g\.less$/, /node_modules/],
                    use: [
                        useSpCssLoader,
                        "postcss-loader",
                        "less-loader",
                        useUniversalAliasLoader
                    ]
                }, {
                    test: /\.scss$/,
                    exclude: [/\.g\.scss$/, /node_modules/],
                    use: [
                        useSpCssLoader,
                        "postcss-loader",
                        "sass-loader",
                        useUniversalAliasLoader
                    ]
                },

                // CSS - in node_modules
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: [
                        "style-loader",
                        "postcss-loader"
                    ]
                }, {
                    test: /\.less$/,
                    include: /node_modules/,
                    use: [
                        "style-loader",
                        "postcss-loader",
                        "less-loader"
                    ]
                }, {
                    test: /\.scss$/,
                    include: /node_modules/,
                    use: [
                        "style-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                },

                // CSS - critical
                {
                    test: isExtractTextPlugin ? /critical\.g\.css$/ : /^IMPOSSIBLE$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader"]
                    })
                }, {
                    test: isExtractTextPlugin ? /critical\.g\.less$/ : /^IMPOSSIBLE$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader", "less-loader"]
                    })
                }, {
                    test: isExtractTextPlugin ? /critical\.g\.scss$/ : /^IMPOSSIBLE$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader", "sass-loader"]
                    })
                },

                // CSS - other global
                {
                    test: /\.g\.css$/,
                    exclude: isExtractTextPlugin ? /critical\.g\.css$/ : undefined,
                    loader: 'style-loader!postcss-loader'
                }, {
                    test: /\.g\.less$/,
                    exclude: isExtractTextPlugin ? /critical\.g\.less$/ : undefined,
                    loader: 'style-loader!postcss-loader!less-loader'
                }, {
                    test: /\.g\.scss$/,
                    exclude: isExtractTextPlugin ? /critical\.g\.scss$/ : undefined,
                    loader: 'style-loader!postcss-loader!sass-loader'
                },

                //

                {
                    test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                    loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
                    exclude: /node_modules/
                }, {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    exclude: /node_modules/
                }, {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader'
                }, {
                    test: /\.nedb$/,
                    loader: 'raw-loader'
                }, {
                    test: /\.md$/,
                    include: [/docs/],
                    loader: 'raw-loader'
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                __CHANNEL__: JSON.stringify(channel),
                __BGIMG_LIST__: JSON.stringify(
                    fs.readdirSync(pathBgimgs).filter(
                        file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
                    )
                ),
                __SWIPER_CSS__: JSON.stringify(
                    fs.readFileSync(path.resolve(pathNodeModules, 'swiper/dist/css/swiper.min.css'), 'utf-8')
                ),
                // '__ICONSVG__': JSON.stringify(
                //     fs.readFileSync(
                //         path.resolve(pathAssets, './symbols/symbol-defs.svg'), 'utf8'
                //     ).replace(/<title>(.+?)<\/title>/g, '')
                // ),
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     names: [
            //         'commons',
            //         'critical',
            //     ],
            //     filename: process.env.WEBPACK_BUILD_ENV !== 'dev'
            //         ? 'core.[chunkhash].js'
            //         : '[name].js'
            // }),
        ],

        resolve: {
            alias: {
                // 目录别名，不用的项目可以删除
                '@app': pathSrc,
                '@appConfig': path.resolve(pathSrc, './config'),
                '@appUtils': path.resolve(pathSrc, './utils'),
                '@appUI': path.resolve(pathSrc, './client/ui'),
                '@appLogic': path.resolve(pathSrc, './client/logic'),
                "@appData": path.resolve(pathSrc, './data'),
                "@appConstants": path.resolve(pathSrc, './constants'),
                "@appConst": path.resolve(pathSrc, './constants'),
                "@appRedux": path.resolve(pathSrc, './redux'),

                '@appLocales': path.resolve(pathRoot, './locales'),
                '@appAssets': path.resolve(pathRoot, './assets'),
                '@appDocs': path.resolve(pathRoot, './docs'),
            }
        }

    }
}
