// rimraf ./dist-web
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const getPics = async (appPath = process.cwd()) => {

    const dirPics = path.resolve(appPath, './src/client/assets/pics/')
    const dirTo = '_pics'
    const dirTarget = path.resolve(appPath, './dist-web/public/client/' + dirTo)

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
                if (!fs.existsSync(path.join(dirTarget, type, id, file)))
                    resultAdd(type, id, file)
            }
        }
    }

    const resultAdd = (type, id, file) => {
        console.log(type, id, file)
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

const run = async () => {
    const results = await getPics()

    console.log(results)
    console.log('___________')
}

run()