// 扩展 webpack 入口执行流程
const webpack = require('webpack')
const path = require('path')

const pluginCopyImages = require('./lib/plugin-copy-images')

const env = process.env.WEBPACK_BUILD_ENV
const stage = process.env.WEBPACK_STAGE_MODE
const appRunPath = process.cwd()

module.exports = async (config = {}) => {
    // 扩展的流程函数
    // 客户端打包: Electron
    if (stage === 'client' && (env === 'electron' || env === 'app')) {
        const getConfig = async (appPath, config) => {
            if (Array.isArray(config))
                return await Promise.all(
                    config.map(async thisConfig =>
                        await getConfig(appPath, thisConfig)
                    )
                )

            const result = Object.assign({}, config, {
                target: 'electron-main',
                devtool: undefined
            })

            result.output.path = process.env.WEBPACK_OUTPUT_PATH
                ? path.normalize(process.env.WEBPACK_OUTPUT_PATH)
                : path.resolve(appPath, `dist-electron`)
            result.output.publicPath = ''

            result.plugins.push(
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    },
                    beautify: false,
                    comments: false,
                    sourceMap: false
                })
            )
            result.plugins.push(
                ...await pluginCopyImages(appPath, 'app', false, true)
            )
            result.plugins.push(
                new webpack.DefinePlugin({
                    '__PUBLIC__': '',
                }),
            )

            return result
        }

        process.env.NODE_ENV = 'production'

        let wcd = await getConfig(
            appRunPath,
            await require(path.resolve(appRunPath, 'system/webpack/client/spa'))(appRunPath)
        )

        const compiler = webpack(wcd)
        compiler.run((err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        })
    }
}