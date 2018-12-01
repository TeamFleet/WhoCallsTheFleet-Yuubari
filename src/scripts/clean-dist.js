// rimraf ./dist-web
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const spinner = require('./commons/spinner')

module.exports = async ({
    dist: pathDist
}) => {
    const dirNamePics = 'pics'

    if (!fs.existsSync(pathDist)) return

    const waiting = spinner('Cleaning dist directory...')

    try {
        const fileList = await new Promise((resolve, reject) => {
            glob(
                path.join(pathDist, '!(node_modules)/**/*'),
                {},
                (err, files) => {
                    if (err) reject(err)
                    resolve(files)
                }
            )
        })

        for (let file of fileList) {
            if (file.indexOf(`/${dirNamePics}/`) > -1) continue
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
    } catch (e) {
        console.log(e)
    }

    // console.log('  > COMPLETE')
    waiting.succeed()
}

// run()
