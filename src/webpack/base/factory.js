const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

const {
    // assets: pathAssets,
    bgimgs: pathBgimgs,
    nodeModules: pathNodeModules,
    src: {
        _: pathSrc,
        // ui: pathUI,
    }
} = require('../../directories')

// const useSpCssLoader = 'sp-css-loader?length=8&mode=replace'
// const useUniversalAliasLoader = {
//     loader: "universal-alias-loader",
//     options: {
//         alias: {
//             "~base.less": pathUI + '/base.less',
//             "~Assets": pathAssets,
//             "~/": pathUI + '//'
//         }
//     }
// }

const channel = require('../../channel')

module.exports = () => {

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
                    test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                    loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
                    exclude: /node_modules/
                }, {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    exclude: /node_modules/
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

    }
}
