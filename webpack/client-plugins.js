const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (appPath) => {
    const pathBgimgs = path.resolve(appPath, './src/client/assets/bgimgs')

    return [
        new CopyWebpackPlugin([
            {
                from: path.resolve(appPath, './src/client/assets/favicon-32.ico'),
                to: '../favicon.ico'
            },
            {
                from: pathBgimgs,
                to: '../bgimgs'
            }
        ]),
        new webpack.DefinePlugin({
            '__BGIMG_LIST__': JSON.stringify(
                fs.readdirSync(pathBgimgs).filter(
                    file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory()
                )
            )
        })
    ]
}