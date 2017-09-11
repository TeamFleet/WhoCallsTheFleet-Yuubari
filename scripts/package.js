/*
 * copy all *.webp from /dist-web/public/app/_pics to pics
 */

const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const asar = require('asar')

const run = async (src) => {
    console.log('')
    console.log('packaging app...')

    const pathRoot = path.resolve(__dirname, '../')
    const pathApp = path.resolve(pathRoot, 'dist-app')
    const pathPics = path.resolve(pathRoot, 'dist-web/public/app/_pics')

    const dest = path.resolve(pathRoot, 'app.asar')

    // determine src path
    if (!src) src = path.resolve(pathRoot, 'dist-app-package')
    src = path.resolve(src)
    console.log(`> source: ${src}`)

    // make sure and empty src directory
    await fs.emptyDir(src)
    console.log(`> source directory make sure empty...`)

    // copy files to src directory
    console.log(`> copying files to source directory...`)
    await fs.copy(pathApp, src)
    console.log(`  > complete!`)

    // copy pics to src directory
    console.log(`> copying pics to source directory...`)
    await new Promise((resolve, rejct) => glob(
        path.resolve(pathPics, '**/*.webp'),
        {},
        (err, files) => {
            if (err) reject(err)
            resolve(files.map(file => file.substr(pathPics.length + 1)))
        }
    )).then(files => new Promise((resolve, reject) => {
        let chain = new Promise(resolve => resolve())
        files.forEach(file => {
            const source = path.resolve(pathPics, file)
            const target = path.resolve(src, 'pics/', file)
            chain = chain.then(() =>
                fs.copy(source, target)
            )
        })
        chain = chain.then(() => resolve(files.length))
            .catch(err => reject(err))
    })).then(count => {
        console.log(`  > copied ${count} files!`)
    })
    // console.log(pics)
    console.log(`  > complete!`)

    // copy startup js to src
    console.log(`> copying other files`)
    await fs.copy(path.resolve(pathRoot, 'src/electron.js'), path.resolve(src, 'start.js'))
    console.log(`  > complete!`)

    // packaging
    console.log(`> packaging...`)
    await new Promise((resolve, reject) => {
        asar.createPackage(src, dest, () => {
            console.log(`  > complete! ${dest}`)
            resolve()
        })
    })

    console.log('> packaging app complete!')
    console.log('')
}

run()