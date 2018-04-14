const fs = require('fs-extra')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const channel = require('../../channel')

// const {
//     base: pathBase,
//     assets: pathAssets,
//     pics: pathPics,
//     bgimgs: pathBgimgs,
//     // _app: pathApp,
//     _appOutput: pathOutput,
// } = require('../../../directories')
const {
    root: pathRoot,
    assets: pathAssets,
    bgimgs: pathBgimgs,
    pics: pathPics,
    dist: {
        includes: pathIncludes,
    }
} = require('../../directories')

const pathAssetsLogos = path.resolve(pathAssets, `./logos/${channel}/`)

const os = require('os')
const platform = os.platform()
const isWindows = /^win/.test(platform)
const isMac = /^darwin/.test(platform)

const pluginCopyImages = async (isDev, isSPA) => {
    if (process.env.WEBPACK_STAGE_MODE === 'server') return []

    const arr = []

    if (isSPA) {
        arr.push({
            context: pathBgimgs,
            from: '**/*.webp',
            to: '../bgimgs'
        })
        arr.push({
            from: path.resolve(pathBgimgs, './thumbnail'),
            to: '../bgimgs/thumbnail'
        })
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
    } else {
        arr.push({
            from: pathBgimgs,
            to: '../bgimgs'
        })
        arr.push({
            from: path.resolve(pathAssets, `logos/${channel}/32.ico`),
            to: '../favicon.ico'
        })
        arr.push(...await getPics(isDev))
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

const asyncTest = async () => {
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

const getPics = async (isDev) => {

    // TODO: check version to overwrite

    const dirPics = pathPics
    const dirTo = '../pics'
    const dirTarget = path.resolve(
        pathIncludes,
        `./${dirTo}`
    )

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
            fs.readFile(path.resolve(pathRoot, `./node_modules/whocallsthefleet-database/db/${dbname}.nedb`), 'utf-8', (err, data) => {
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

module.exports = pluginCopyImages