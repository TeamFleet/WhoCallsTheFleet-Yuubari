const webpack = require('webpack')
const fs = require('fs-extra')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackOnBuildPlugin = require('on-build-webpack')

const appPath = process.cwd()
const base = require('./_base')
const pathBgimgs = path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output')
const dirs = require('../directories')

const extractCriticalCSS = new ExtractTextPlugin('[name].[chunkhash].css')

module.exports = [
    extractCriticalCSS,
    new webpack.DefinePlugin({
        '__ELECTRON__': base.WEBPACK_BUILD_ENV === 'electron' || base.WEBPACK_BUILD_ENV === 'app',
        '__CHANNEL__': JSON.stringify(
            require(path.resolve(appPath, 'utils/get-channel'))()
        ),
        '__BGIMG_LIST__': JSON.stringify(
            fs.readdirSync(pathBgimgs).filter(
                file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
            )
        ),
        '__ICONSVG__': JSON.stringify(
            fs.readFileSync(
                path.resolve(dirs.assets, './symbols/symbol-defs.svg'), 'utf8'
            ).replace(/<title>(.+?)<\/title>/g, '')
        ),
    }),
    require('./_base').isSPA ? new WebpackOnBuildPlugin(function (stats) {
        const htmlFileName = process.env.WEBPACK_BUILD_ENV === 'electron' ? 'index.html' : '../index.html'

        // After webpack build...
        // create(parseOptions(...args))
        // console.log('')
        // console.log('----------------------------------------')
        // console.log('')

        const chunks = {}
        const outputPath = stats.compilation.outputOptions.path
        const publicPath = stats.compilation.outputOptions.publicPath
        let html = fs.readFileSync(
            path.resolve(outputPath, htmlFileName),
            'utf-8'
        )

        // const log = (obj, spaceCount = 1, deep = 2) => {
        //     if (typeof obj === 'object') {
        //         let spaces = ''
        //         times(spaceCount)(() => {
        //             spaces += '    '
        //         })
        //         for (let key in obj) {
        //             console.log(spaces + key)
        //             if (spaceCount < deep)
        //                 log(obj[key], spaceCount + 1, deep)
        //         }
        //     }
        // }

        // log(stats)

        // for (let key in stats) {
        //     console.log(key)
        //     obj[key] = stats[key]
        // }
        // console.log(stats.compilation.namedChunks)

        // log(stats.compilation.chunks, undefined, 2)

        for (let id in stats.compilation.chunks) {
            const o = stats.compilation.chunks[id]
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
        // console.log(outputPath)

        html = html.replace(/\{\{[ ]*SRC:(.+?)[ ]*\}\}/g, (match, ...parts) => {
            // console.log(match, parts)
            return publicPath + chunks[parts[0]][0]
        })

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

        // SVG Symbols
        html = html.replace(
            /\{\{[ ]*SVG_SYMBOLS[ ]*\}\}/g,
            fs.readFileSync(
                path.resolve(dirs.assets, 'symbols/symbol-defs.svg'), 'utf8'
            ).replace(/<title>(.+?)<\/title>/g, '')
        )

        // write file

        fs.writeFileSync(
            path.resolve(outputPath, htmlFileName),
            html,
            'utf-8'
        )

        // console.log('')
        // console.log('----------------------------------------')
        // console.log('')

    }) : undefined,
]
