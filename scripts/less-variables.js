const path = require('path')
const fs = require('fs-extra')
const kckit = require('kckit')
const sizeOf = require('image-size')

const pathfile = path.resolve(process.cwd(), 'src/app/client/ui/base/less/', 'variables.less')

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
            path.resolve(process.cwd(), 'src/app/client/assets/', 'equiptypeicon.png')
        )
        const count = Math.ceil(dimensions.height / dimensions.width)
        content = content.replace(
            /@equipment-icons-count:([ \t]*)([0-9]+);/g,
            `@equipment-icons-count:$1${parseInt(count)};`
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