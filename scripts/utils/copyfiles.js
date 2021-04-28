const fs = require('fs-extra');
const path = require('path');
const md5File = require('md5-file');
const getDistPath = require('koot/utils/get-dist-path');
// const ncp = require('ncp').ncp

const Progress = require('../utils/progress');

module.exports = async (list = [], title = 'Copying files') => {
    // const dirIncludes = getDistIncludes();

    const dist = getDistPath();

    if (!list.length) return;

    const bar = new Progress({
        title,
        total: list.length,
    });

    for (const f of list) {
        let from, to;

        if (typeof f === 'string') {
            from = f;
            to = !fs.lstatSync(from).isDirectory()
                ? path.resolve(dist, path.basename(from))
                : dist;
        } else {
            from = f.from;
            to = f.to;
        }

        if (!fs.existsSync(from)) continue;
        else if (!fs.existsSync(to)) await fs.copy(from, to);
        else if (
            fs.lstatSync(from).isDirectory() &&
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
