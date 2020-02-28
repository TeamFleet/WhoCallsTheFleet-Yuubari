const fs = require('fs-extra');
const path = require('path');
const md5File = require('md5-file');

const {
    assets: dirAssets,
    bgimgs: dirBgimgs,
    static: dirStatic
} = require('../../src/directories');
const channel = require('../../src/channel');
const spinner = require('../../src/scripts/commons/spinner');
const Progress = require('../../src/scripts/commons/progress');

/**
 * 准备静态资源目录，用以直接复制到打包目录
 */
module.exports = async (kootConfig = {}) => {
    const title = 'Preparing static files...';
    const waiting = spinner(title);

    await fs.ensureDir(dirStatic);

    const list = [
        {
            from: dirBgimgs,
            to: 'bgimgs'
        },
        {
            from: path.resolve(dirAssets, `logos`, channel, `32.ico`),
            to: 'favicon.ico'
        },
        {
            from: path.resolve(__dirname, '../../src/assets/public', channel),
            to: ''
        }
    ];

    list.forEach(o => {
        o.to = path.resolve(dirStatic, o.to);
    });

    waiting.stop();
    const bar = new Progress({
        title,
        total: list.length
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
        bar.tick();
    }

    bar.complete();
};
