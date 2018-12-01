const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const spinner = require('./commons/spinner')

const {
    getDistPublic,
} = require('../directories')

module.exports = async () => {
    const pathPublic = getDistPublic()

    // console.log('cleaning source-maps...')
    const waiting = spinner('Cleaning source-maps...')

    const removed = []
    const modified = []

    let files

    files = await new Promise((resolve, reject) => {
        glob(path.resolve(pathPublic, '**', '*.map'), {}, (err, files) => {
            if (err) return reject(err)
            resolve(files)
        })
    })
    for (let file of files) {
        await fs.removeSync(file)
        removed.push(file)
    }

    // modify js/css files
    files = await new Promise((resolve, reject) => {
        glob(path.resolve(pathPublic, '**', '*.+(js|css)'), {}, (err, files) => {
            if (err) return reject(err)
            resolve(files)
        })
    })
    for (let file of files) {
        const content = await fs.readFile(file, 'utf-8')
        const regex = /\r?\n\/\/# sourceMappingURL=.+$/
        if (regex.test(content)) {
            await fs.writeFile(
                file,
                content.replace(regex, ''),
                'utf-8'
            )
            modified.push(file)
        }
    }

    waiting.succeed()

    const logResult = (arr, title) => {
        if (arr.length) {
            console.log(`  > ${title}:`)
            arr.forEach(file => {
                console.log(`    > ${path.relative(pathPublic, file)}`)
            })
        }
    }
    logResult(removed, 'Removed')
    logResult(modified, 'Modified')
}
