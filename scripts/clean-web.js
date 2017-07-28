// rimraf ./dist-web
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const run = async () => {
    const dirDistWeb = path.join(__dirname, '../dist-web')
    const dirNamePics = '_pics'

    if (!fs.existsSync(dirDistWeb)) return

    const fileList = await new Promise((resolve, reject) => {
        glob(
            path.join(dirDistWeb, '**/*'),
            {},
            (err, files) => {
                if (err) reject(err)
                resolve(files)
            }
        )
    })

    for (let file of fileList) {
        if (file.indexOf(`public/app/${dirNamePics}/`) > -1) continue
        if (file.indexOf(`public${path.sep}app${path.sep}${dirNamePics}${path.sep}`) > -1) continue
        if (/\/public\/app\/_pics$/.test(file)) continue
        if (/\/public\/app$/.test(file)) continue
        if (/\/public$/.test(file)) continue

        await new Promise((resolve, reject) => {
            fs.remove(file, err => {
                if (err) reject(err)
                // console.log('  > removed ' + file)
                resolve()
            })
        })
    }

    console.log('  > cleaned /dist-web')
    console.log('')
}

run()