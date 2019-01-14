const fs = require('fs-extra')
const path = require('path')
const md5File = require('md5-file')
// const ncp = require('ncp').ncp
// const getDistPath = require('super-project/utils/get-dist-path')

const {
    root: dirRoot,
    assets: dirAssets,
    pics: dirPics,
    bgimgs: dirBgimgs,
    // getDistPublic,
    getDistIncludes,
    // dist: {
    //     includes: dirIncludes,
    // }
} = require('../directories')
const channel = require('../channel')
const spinner = require('./commons/spinner')
const Progress = require('./commons/progress')

module.exports = async () => {
    const dirIncludes = getDistIncludes()

    const title = 'Copying files...'
    const waiting = spinner(title)

    const {
        WEBPACK_BUILD_ENV: ENV,
        // WEBPACK_BUILD_STAGE: STAGE,
    } = process.env

    // console.log(dirDist)
    // console.log(dirBgimgs)

    const copy = [
        {
            from: dirBgimgs,
            to: '../bgimgs'
        },
        {
            from: path.resolve(dirAssets, `logos/${channel}/32.ico`),
            to: '../favicon.ico'
        }
    ]

    if (ENV === 'prod') copy.push(...await getPics())

    copy.forEach(o => {
        o.to = path.resolve(dirIncludes, o.to)
    })

    waiting.stop()
    const bar = new Progress({
        title,
        total: copy.length
    })

    for (let { from, to } of copy) {
        if (!fs.existsSync(to) || md5File.sync(from) !== md5File.sync(to))
            await fs.copy(from, to)
        // await new Promise((resolve, reject) => {
        //     console.log(' ')
        //     console.log(o.from)
        //     console.log(o.to)
        //     ncp(o.from, o.to, function (err) {
        //         if (err) {
        //             console.log(err)
        //             return reject(err);
        //         }
        //         resolve('done!');
        //     });
        // })
        // await new Promise(resolve => {
        //     setTimeout(() => {
        //         resolve()
        //     }, 1000)
        // })
        bar.tick()
    }

    bar.complete()
}

const getPics = async () => {
    // TODO: check version to overwrite

    const dirIncludes = getDistIncludes()

    const dirTo = '../../pics'
    const dirTarget = path.resolve(
        dirIncludes,
        // getDistPublic(),
        `./${dirTo}`
    )

    let results = []
    let ships

    const filelist = {
        ships: [
            '0',
            '0-1',
            '0-2',
        ],
        shipsExtra: ['8', '9'],
        equipments: ['card']
    }

    const getDb = async (dbname) => {
        let arr = []
        await new Promise((resolve, reject) => {
            fs.readFile(path.resolve(dirRoot, `./node_modules/whocallsthefleet-database/db/${dbname}.nedb`), 'utf-8', (err, data) => {
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

    const checkAndCopy = async (type, id, listBasename) => {
        const dir = path.join(dirPics, type, id)
        const files = await readdir(dir)
        files.forEach(filename => {
            const extname = path.extname(filename)
            const basename = path.basename(filename, extname)

            if (Array.isArray(listBasename) && !listBasename.includes(basename))
                return

            // const target = path.join(dirTarget, type, id, filename)
            // if (!fs.existsSync(target))
            resultAdd(type, id, filename)
        })
    }

    const resultAdd = (type, id, file) => {
        // console.log(type, id, file)
        results.push({
            // context: path.resolve(dirPics),
            // from: `${type}/${id}/${file}`,
            from: path.resolve(dirPics, type, id, file),
            to: `${dirTo}/${type}/${id}/${file}`
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
                        await checkAndCopy(type, id, filelist.ships)
                    } else
                        await checkAndCopy(type, id, [
                            ...filelist.ships,
                            '8',
                            '9',
                            '10',
                            'special'
                        ])
                    break
                }
                case 'ships-extra':
                    await checkAndCopy(type, id, filelist.shipsExtra)
                    break
                case 'equipments':
                    await checkAndCopy(type, id, filelist.equipments)
                    break
                default:
                    await checkAndCopy(type, id)
                    break
            }
        }
    }

    // enemies

    // console.log(results)

    return results
}
