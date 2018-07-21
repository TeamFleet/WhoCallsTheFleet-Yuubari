const path = require('path')
const fs = require('fs-extra')

const {
    bgimgs: pathBgimgs,
    nodeModules: pathNodeModules,
    assets: pathAssets
} = require('./directories')

module.exports = {
    __CHANNEL__: JSON.stringify(require('./channel')),

    __BGIMG_LIST__: JSON.stringify(
        fs.readdirSync(pathBgimgs)
            .filter(file => (
                !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() &&
                path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
            ))
    ),

    __SWIPER_CSS__: JSON.stringify(
        fs.readFileSync(
            path.resolve(pathNodeModules, 'swiper/dist/css/swiper.min.css'),
            'utf-8'
        )
    ),

    __SVG_SYMBOLS__: JSON.stringify(
        fs.readFileSync(
            path.resolve(pathAssets, './symbols/symbol-defs.svg'),
            'utf8'
        )
            .replace(/<title>(.+?)<\/title>/g, '')
            .replace(/\n/g, '')
    )
}
