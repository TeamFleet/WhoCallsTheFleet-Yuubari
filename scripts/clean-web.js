// rimraf ./dist-web
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

module.exports = async () => {
    // const {
    //     output: dirDistWeb,
    // } = require('../config/directories')
    // const dirDistWeb = path.join(__dirname, '../dist-web')
    const pathDist = global.__SUPER_DIST__ || (typeof __DIST__ === 'undefined' ? '' : __DIST__)
    const dirNamePics = 'pics'

    if (!fs.existsSync(pathDist)) return

    const fileList = await new Promise((resolve, reject) => {
        glob(
            path.join(pathDist, '**/*'),
            {},
            (err, files) => {
                if (err) reject(err)
                resolve(files)
            }
        )
    })

    for (let file of fileList) {
        if (file.indexOf(`public/${dirNamePics}/`) > -1) continue
        if (file.indexOf(`public${path.sep}${dirNamePics}${path.sep}`) > -1) continue
        if (/\/public\/pics$/.test(file)) continue
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

// run()