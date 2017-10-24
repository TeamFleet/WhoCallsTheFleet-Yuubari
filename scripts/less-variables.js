const path = require('path')
const fs = require('fs-extra')
const kckit = require('kckit')
const sizeOf = require('image-size')

const {
    assets: pathAssets,
    _app: pathApp,
    _appUI: pathAppUI,
} = require('../config/directories')

// const pathAssets = path.resolve(process.cwd(), 'src/app/client/assets/')
const pathfile = path.resolve(pathAppUI, './base/less/variables.less')

const run = async () => {
    console.log('replacing less variables...')

    let content = await new Promise((resolve, reject) => {
        fs.readFile(pathfile, 'utf-8', (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

    // max ship level
    content = content.replace(/@maxlv:([ \t]*)([0-9]+);/g, `@maxlv:$1${parseInt(kckit.maxShipLv)};`)

    // equipment icons count
    {
        const dimensions = sizeOf(
            path.resolve(pathAssets, 'equiptypeicon.png')
        )
        const count = Math.ceil(dimensions.height / dimensions.width)
        content = content.replace(
            /@equipment-icons-count:([ \t]*)([0-9]+);/g,
            `@equipment-icons-count:$1${parseInt(count)};`
        )
    }

    // equipment list stat columns count
    {
        const stats = require(
            path.resolve(pathApp, 'data/', 'equipment-stats')
        )
        content = content.replace(
            /@equipment-list-stat-count:([ \t]*)([0-9]+);/g,
            `@equipment-list-stat-count:$1${parseInt(stats.length + 2)};`
        )
    }

    // navy flags count
    {
        const dimensions = sizeOf(
            path.resolve(pathAssets, 'navy-flags/normal.png')
        )
        const count = Math.floor(dimensions.height / (dimensions.width - 1))
        content = content.replace(
            /@navy-flags-count:([ \t]*)([0-9]+);/g,
            `@navy-flags-count:$1${parseInt(count)};`
        )
    }

    await new Promise((resolve, reject) => {
        fs.writeFile(
            pathfile,
            content,
            'utf-8',
            (err) => {
                if (err) reject(err)
                else resolve()
            }
        )
    })

    console.log('COMPLETE: replace less variables')
}

run()