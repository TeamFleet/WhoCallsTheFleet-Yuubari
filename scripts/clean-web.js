// rimraf ./dist-web
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const run = async () => {
    const dirDistWeb = path.join(__dirname, '../dist-web')

    if (!fs.existsSync(dirDistWeb)) return

    const fileList = await new Promise((resolve, reject) => {
        glob(
            path.join(dirDistWeb, '**/!(pics)/!(pics)'),
            {},
            (err, files) => {
                if (err) reject(err)
                resolve(files)
            }
        )
    })

    for (let file of fileList) {
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