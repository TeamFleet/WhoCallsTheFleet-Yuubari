const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')

const {
    bgimgs: pathBgimgs,
    nodeModules: pathNodeModules,
    src: {
        _: pathSrc,
    }
} = require('../../directories')

const channel = require('../../channel')

module.exports = () => ({

    entry: {
        critical: [
            path.resolve(pathSrc, './client/critical.js')
        ],
        polyfill: [
            "babel-polyfill",
            path.resolve(pathSrc, './client/critical.extra-old-ie.js')
        ],
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
                    file => (
                        !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() &&
                        path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
                    )
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
    ],

})
