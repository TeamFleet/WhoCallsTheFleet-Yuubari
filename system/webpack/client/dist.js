const path = require('path')
const webpack = require('webpack')
const common = require('../common')

const factoryConfig = async(opt) => {

    let { RUN_PATH, CLIENT_DEV_PORT, APP_KEY } = opt

    return {
        target: 'web',
        devtool: 'source-map',
        entry: {
            client: [
                path.resolve(RUN_PATH, `./apps/${APP_KEY}/client/index.js`)
            ]
        },
        module: {
            rules: [...common.rules]
        },
        plugins: [
            // 在node执行环境中设置，不起作用，此处不能省略
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                beautify: false,
                comments: false,
                sourceMap: false
            })
        ],
        resolve: common.resolve
    }
}

module.exports = async(opt) => await factoryConfig(opt)