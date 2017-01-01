/*
ares: "1.10.1-DEV"
chromium: "54.0.2840.99"
http_parser: "2.7.0"
modules: "51"
node: "7.2.0"
node-webkit: "0.18.8"
nw: "0.18.8"
nw-commit-id: "0523d1a-e50d604-90170c3-9fdd90a"
openssl: "1.0.2j"
uv: "1.10.1"
v8: "5.4.500.41"
zlib: "1.2.8"
 */

"use strict"

const path = require('path')

const dir = {
    src: path.resolve(process.cwd(), 'src'),
    dist: path.resolve(process.cwd(), 'app/dist/')
}

module.exports = {
    entry: {
        critical: [
            path.join(dir.src, 'critical.js')
        ],
        main: [
            path.join(dir.src, 'main.jsx')
        ]
    },
    output: {
        path: dir.dist,
        publicPath: '/app/dist/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    target: "node-webkit",
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
                loader: 'file-loader',
                exclude: /node_modules/,
                options: {
                    name: 'dist/[hash].[ext]'
                }
            },
            {
                test: /\.js?$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            'env', {
                                targets: {
                                    chrome: 54,
                                    node: 7.2
                                },
                                modules: false
                            }
                        ],
                        'react'
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ],
        noParse: /\.min\./
    }
}