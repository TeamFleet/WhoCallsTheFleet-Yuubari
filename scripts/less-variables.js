const path = require('path')
const fs = require('fs-extra')
const kckit = require('kckit')

const pathfile = path.resolve(process.cwd(), 'src/app/client/ui/base/less/', 'variables.less')

const run = async () => {
    console.log('compressing database...')

    const content = await new Promise((resolve, reject) => {
        fs.readFile(pathfile, 'utf-8', (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

    await new Promise((resolve, reject) => {
        fs.writeFile(
            pathfile,
            content.replace(/@maxlv:([ \t]*)([0-9]+);/g, `@maxlv:$1${parseInt(kckit.maxShipLv)};`),
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