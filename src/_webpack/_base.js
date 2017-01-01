"use strict"

const path = require('path')

module.exports = (options = {
    distPath: path.resolve(process.cwd(), 'app/dist/'),
    publicPath: '/app/dist/',
    target: 'node-webkit',
    babel: {
        presets: {
            env: {
                targets: {},
                modules: false
            }
        }
    },
    plugins: []
}) => {
    const srcPath = path.resolve(process.cwd(), 'src')
    return {
        entry: {
            critical: [
                path.join(srcPath, 'critical.js')
            ],
            main: [
                path.join(srcPath, 'main.jsx')
            ]
        },
        output: {
            path: options.distPath,
            publicPath: options.publicPath,
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },
        target: options.target,
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
                                'env', options.babel.presets.env
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
        },
        plugins: options.plugins
    }
}