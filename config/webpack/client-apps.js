// 客户端打包项目列表
// 可返回: string, object, [string], [object]
// 默认 webpack 逻辑下，项目必须位于 /apps 目录下

/* string
 * 仅打包单一项目，仅提供项目名称
 * 
 * module.exports = 'app'
 */

/* object
 * 仅打包单一项目，提供详细选项
 * 
 * module.exports = {
 *      app: 'app',
 *      ...settings
 * }
 */

/* [string], [object]
 * 打包多个项目，array 中每个元素类型均可为 string 或 string
 * 
 * module.exports = [
 *      'app-1',
 *      {
 *          app: 'app-2',
 *          pwa: false,
 *          'client-dist': {
 *              output: {
 *                  filename: `[name].custom.js`
 *              }
 *              plugins: {
 *                  ...newPlugins
 *              }
 *          }
 *      }
 * ]
 */

/* 项目详细选项
 *
 * app  string  项目名称
 * pwa  boolean|function  仅针对dist。是否启用PWA，如果为true则启用默认service-worker，否则请提供webpack插件函数，参见/system/webpack/client/dist.js
 * spaHtmlTitle  string  仅针对spa。SPA模板页面默认标题
 * spaTemplatePath  string  仅针对spa。SPA模板文件位置
 * [`${process.env.WEBPACK_STAGE_MODE}-${process.env.WEBPACK_BUILD_ENV}`]
 *      object
 *      为对应的打包类型扩展配置
 */

const fs = require('fs-extra')
const path = require('path')
const pwaCreatePlugin = require('sp-pwa')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const appPath = process.cwd()
const {
    assets: pathAssets
} = require('../directories')
const outputPath = require('./output-path')

const os = require('os')
const platform = os.platform()
const isWindows = /^win/.test(platform)
const isMac = /^darwin/.test(platform)

const channel = require(path.resolve(appPath, 'utils/get-channel'))()

const pluginCopyImages = async (appPath, type, isDev, isSPA) => {
    const arr = []

    if (isSPA) {
        arr.push({
            context: path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output'),
            from: '**/*.webp',
            to: '_bgimgs'
        })
        arr.push({
            from: path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output/thumbnail'),
            to: '_bgimgs/thumbnail'
        })
        if (type === 'app') {
            const pathAssetsLogos = path.resolve(pathAssets, `logos/${channel}/`)
            arr.push({
                from: path.resolve(pathAssetsLogos, 'appicon.ico'),
                to: 'assets'
            })
            arr.push({
                from: path.resolve(pathAssetsLogos, 'appicon.icns'),
                to: 'assets'
            })
            arr.push({
                from: path.resolve(pathAssetsLogos, `128.png`),
                to: 'assets/appicon.png'
            })
        }
    } else {
        arr.push({
            from: path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output'),
            to: '_bgimgs'
        })
        arr.push({
            from: path.resolve(pathAssets, `logos/${channel}/32.ico`),
            to: '../favicon.ico'
        })
        arr.push(...await getPics(appPath, isDev))
    }

    const plugins = [
        new CopyWebpackPlugin(arr)
    ]
    // switch (type) {
    //     case 'app': {
    //         const pathBgimgs = path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output')
    //         plugins.push(
    //             new webpack.DefinePlugin({
    //                 '__BGIMG_LIST__': JSON.stringify(
    //                     // glob.sync(path.resolve(pathBgimgs, '*.jpg'))
    //                     fs.readdirSync(pathBgimgs).filter(
    //                         file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
    //                     )
    //                 ),
    //                 '__ICONSVG__': JSON.stringify(
    //                     fs.readFileSync(
    //                         path.resolve(appPath, './src/app/client/assets/symbols/symbol-defs.svg'), 'utf8'
    //                     ).replace(/<title>(.+?)<\/title>/g, '')
    //                 )
    //             })
    //         )
    //         break
    //     }
    // }
    return plugins
}

const asyncTest = async (appPath) => {
    return await new Promise(resolve => {
        setTimeout(() => {
            console.log('alalala')
            resolve(
                [{
                    from: path.resolve(pathAssets, `akashi.png`),
                }]
            )
        }, 10000)
    })
}

const getPics = async (appPath = process.cwd(), isDev) => {

    // TODO: check version to overwrite

    const dirPics = path.resolve(appPath, './pics/')
    const dirTo = '_pics'
    const dirTarget = path.resolve(appPath, outputPath, 'public/app/' + dirTo)

    let results = []
    let ships

    const filelist = {
        ships: [
            '0',
            '0-1',
            '0-2'
        ],
        shipsExtra: ['8', '9'],
        equipments: ['card']
    }

    const getDb = async (dbname) => {
        let arr = []
        await new Promise((resolve, reject) => {
            fs.readFile(path.resolve(appPath, `./node_modules/whocallsthefleet-database/db/${dbname}.nedb`), 'utf-8', (err, data) => {
                if (err) reject(err)
                data.split(/\r?\n/).forEach(item => {
                    if (!item) return
                    arr.push(JSON.parse(item))
                })
                resolve()
            })
        })
        return arr
    }

    const readdir = async (dir) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) reject(err)
                resolve(files)
            })
        })
    }

    const checkDo = async (type, id, listBasename) => {
        for (let file of await readdir(path.join(dirPics, type, id))) {
            if (typeof listBasename === 'undefined' || listBasename.indexOf(path.basename(file, path.extname(file))) > -1) {
                if (!isDev && !fs.existsSync(path.join(dirTarget, type, id, file)))
                    resultAdd(type, id, file)
            }
        }
    }

    const resultAdd = (type, id, file) => {
        // console.log(type, id, file)
        results.push({
            context: path.resolve(dirPics),
            from: `${type}/${id}/${file}`,
            to: `${dirTo}/${type}/${id}`
        })
    }

    for (let type of await readdir(dirPics)) {
        const dirType = path.join(dirPics, type)
        for (let id of await readdir(dirType)) {
            switch (type) {
                case 'ships': {
                    if (!ships) {
                        ships = {}
                        for (let ship of await getDb('ships')) {
                            ships[ship.id] = ship
                        }
                    }
                    if (ships[id] && ships[id].illust_same_as_prev) {
                        // console.log(id, ships[id].name.ja_jp)
                        await checkDo(type, id, filelist.ships)
                    } else
                        await checkDo(type, id, [
                            ...filelist.ships,
                            '8',
                            '9',
                            '10'
                        ])
                    break
                }
                case 'ships-extra':
                    await checkDo(type, id, filelist.shipsExtra)
                    break
                case 'equipments':
                    await checkDo(type, id, filelist.equipments)
                    break
                default:
                    await checkDo(type, id)
                    break
            }
        }
    }

    // enemies

    // console.log(results)

    return results
}

module.exports = (async () => (
    [{
        app: 'app',

        pwa: pwaCreatePlugin({
            outputPath: path.resolve(outputPath, `public/app/`, '../'),
            outputFilename: `service-worker.app.js`,
            // customServiceWorkerPath: path.normalize(appPath + '/src/client/custom-service-worker.js'),
            globPattern: `/app/**/*`,
            globOptions: {
                ignore: [
                    '/**/_*/',
                    '/**/_*/**/*'
                ]
            },
            // appendUrls: getUrlsFromRouter()
            appendUrls: []
        }),

        spaHtmlTitle: 'WhoCallsTheFleet',
        // spaTemplatePath: path.resolve(process.cwd(), `./apps/app/html.ejs`),

        'client-dev': {
            plugins: [
                ...await pluginCopyImages(appPath, 'app', true)
            ]
        },
        'client-dist': {
            plugins: [
                ...await pluginCopyImages(appPath, 'app', false)
            ]
        },
        'client-spa': {
            plugins: [
                ...await pluginCopyImages(appPath, 'app', false, true)
            ]
        },
        // 'server-dev': {},
        // 'server-dist': {},
    }]
))()