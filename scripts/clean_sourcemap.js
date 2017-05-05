const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')

const distpath = path.resolve(process.cwd(), 'dist-web', 'public')

const run = () => {
    console.log('cleaning source-maps...')

    glob.sync(path.resolve(distpath, '**', '*.map')).forEach(file => {
        fs.removeSync(file)
        console.log('  > removed: ' + file)
    })

    // modify js files
    glob.sync(path.resolve(distpath, '**', '*.js')).forEach(file => {
        // fs.removeSync(file)
        fs.writeFileSync(
            file,
            fs.readFileSync(file, 'utf-8').replace(/\r?\n\/\/\# sourceMappingURL=.+$/, ''),
            'utf-8'
        )
        console.log('  > modified: ' + file)
    })

    console.log('COMPLETE: clean source-maps')
}

run()