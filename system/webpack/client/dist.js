const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const common = require('../common')

const WebpackOnBuildPlugin = require('on-build-webpack')

const factoryConfig = async(opt) => {

    let { RUN_PATH, CLIENT_DEV_PORT, APP_KEY } = opt

    return {
        target: 'web',
        // devtool: 'source-map',
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
            }),
            await new WebpackOnBuildPlugin(async function (stats) {
                // After webpack build...
                // create(parseOptions(...args))
                // console.log('')
                // console.log('----------------------------------------')
                // console.log('')

                const chunks = {}
                // const outputPath = stats.compilation.outputOptions.path
                // const publicPath = stats.compilation.outputOptions.publicPath

                const times = n => f => {
                    let iter = i => {
                        if (i === n) return
                        f(i)
                        iter(i + 1)
                    }
                    return iter(0)
                }

                const log = (obj, spaceCount = 1, deep = 2) => {
                    if (typeof obj === 'object') {
                        let spaces = ''
                        times(spaceCount)(() => {
                            spaces += '    '
                        })
                        for (let key in obj) {
                            console.log(spaces + key)
                            if (spaceCount < deep)
                                log(obj[key], spaceCount + 1, deep)
                        }
                    }
                }

                // log(stats)

                // for (let key in stats) {
                //     console.log(key)
                //     obj[key] = stats[key]
                // }
                // console.log(stats.compilation.namedChunks)

                // log(stats.compilation.chunks, undefined, 2)

                for (let id in stats.compilation.chunks) {
                    const o = stats.compilation.chunks[id]
                    // console.log(o)
                    if (typeof o.name === 'undefined' || o.name === null) continue
                    chunks[o.name] = o.files
                    // console.log(
                    //     o.id,
                    //     // o.ids,
                    //     o.name,
                    //     // o.chunks,
                    //     o.files
                    //     // o.hash,
                    //     // o.renderedHash
                    // )
                }

                // console.log(chunks)
                // console.log(outputPath, htmlFileName)
                // console.log(outputPath)

                await fs.writeJsonSync(
                    path.resolve(
                        stats.compilation.outputOptions.path,
                        `.chunckmap.json`
                    ),
                    chunks,
                    {
                        spaces: 4
                    }
                )

                // id
                // ids
                // debugId
                // name
                // _modules
                // entrypoints
                // chunks
                // parents
                // blocks
                // origins
                // files
                // rendered
                // entryModule
                // hash
                // renderedHash

                // console.log('')
                // console.log('----------------------------------------')
                // console.log('')

            }),
        ],
        resolve: common.resolve
    }
}

module.exports = async(opt) => await factoryConfig(opt)
