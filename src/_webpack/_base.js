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
    browserList: [],
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
                    exclude: /node_modules/,
                    loader: 'file-loader',
                    options: {
                        name: 'files/[hash].[ext]'
                    }
                },
                {
                    test: /\.js?$|\.jsx$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        'env', options.babel.presets.env
                                    ],
                                    'react'
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                camelCase: true,
                                autoprefixer: {
                                    'browsers': options.browserList,
                                    add: true
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                camelCase: true,
                                autoprefixer: {
                                    'browsers': options.browserList,
                                    add: true
                                }
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                }
            ],
            noParse: /\.min\./
        },
        plugins: options.plugins
    }
}