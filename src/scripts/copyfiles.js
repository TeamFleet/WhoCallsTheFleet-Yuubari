const fs = require('fs-extra');
const path = require('path');
const md5File = require('md5-file');
// const ncp = require('ncp').ncp
const getDistPath = require('koot/utils/get-dist-path');

const {
    root: dirRoot,
    pics: dirPics,
    // dist: {
    //     includes: dirIncludes,
    // }
} = require('../directories');
const spinner = require('./commons/spinner');
const Progress = require('./commons/progress');

module.exports = async (kootConfig = {}) => {
    // const dirIncludes = getDistIncludes();

    const title = 'Copying files...';
    const waiting = spinner(title);

    const {
        WEBPACK_BUILD_ENV: ENV,
        // WEBPACK_BUILD_STAGE: STAGE,
    } = process.env;

    // console.log(dirDist)
    // console.log(dirBgimgs)

    const { __CLIENT_ROOT_PATH } = kootConfig;

    const list = [];

    // if (ENV === 'prod' && !process.env.quickStart)
    //     list.push(...(await getPics(kootConfig)));

    list.forEach((o) => {
        o.to = path.resolve(__CLIENT_ROOT_PATH, o.to);
    });

    waiting.stop();

    if (!list.length) return;

    const bar = new Progress({
        title,
        total: list.length,
    });

    for (const { from, to } of list) {
        if (!fs.existsSync(from)) continue;
        else if (!fs.existsSync(to)) await fs.copy(from, to);
        else if (
            fs.lstatSync(from).isDirectory() ||
            fs.lstatSync(to).isDirectory()
        )
            await fs.copy(from, to);
        else if (md5File.sync(from) !== md5File.sync(to))
            await fs.copy(from, to);
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
        bar.tick();
    }

    bar.complete();
};

const getPics = async (kootConfig = {}) => {
    // TODO: check version to overwrite

    // const dirTo = '../../pics';
    const dirTo = path.resolve(getDistPath(), 'pics');

    const results = [];
    let ships;

    const filelist = {
        ships: ['0', '0-1', '0-2'],
        shipsExtra: ['8', '9'],
        equipments: ['card'],
    };

    const getDb = async (dbname) => {
        const arr = [];
        await new Promise((resolve, reject) => {
            fs.readFile(
                path.resolve(
                    dirRoot,
                    `./node_modules/whocallsthefleet-database/db/${dbname}.nedb`
                ),
                'utf-8',
                (err, data) => {
                    if (err) reject(err);
                    data.split(/\r?\n/).forEach((item) => {
                        if (!item) return;
                        arr.push(JSON.parse(item));
                    });
                    resolve();
                }
            );
        });
        return arr;
    };

    const readdir = async (dir) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    };

    const checkAndCopy = async (type, id, listBasename) => {
        const dir = path.join(dirPics, type, id);
        const files = await readdir(dir);
        files.forEach((filename) => {
            const extname = path.extname(filename);
            const basename = path.basename(filename, extname);

            if (Array.isArray(listBasename) && !listBasename.includes(basename))
                return;

            // const target = path.join(dirTarget, type, id, filename)
            // if (!fs.existsSync(target))
            resultAdd(type, id, filename);
        });
    };

    const resultAdd = (type, id, file) => {
        // console.log(type, id, file)
        results.push({
            // context: path.resolve(dirPics),
            // from: `${type}/${id}/${file}`,
            from: path.resolve(dirPics, type, id, file),
            to: `${dirTo}/${type}/${id}/${file}`,
        });
    };

    for (const type of await readdir(dirPics)) {
        const dirType = path.join(dirPics, type);
        for (const id of await readdir(dirType)) {
            switch (type) {
                case 'ships': {
                    if (!ships) {
                        ships = {};
                        for (const ship of await getDb('ships')) {
                            ships[ship.id] = ship;
                        }
                    }
                    if (ships[id] && ships[id].illust_same_as_prev) {
                        // console.log(id, ships[id].name.ja_jp)
                        await checkAndCopy(type, id, filelist.ships);
                    } else
                        await checkAndCopy(type, id, [
                            ...filelist.ships,
                            '8',
                            '9',
                            '10',
                            'special',
                        ]);
                    break;
                }
                case 'ships-extra':
                    await checkAndCopy(type, id, filelist.shipsExtra);
                    break;
                case 'equipments':
                    await checkAndCopy(type, id, filelist.equipments);
                    break;
                default:
                    await checkAndCopy(type, id);
                    break;
            }
        }
    }

    // enemies

    // console.log(results)

    return results;
};
