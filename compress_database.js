const LZString = require('lz-string')
const path = require('path')
const fs = require('fs-extra')

const dbpath = path.resolve(process.cwd(), 'node_modules', 'whocallsthefleet-database', 'db')
const topath = path.resolve(process.cwd(), 'src', 'client', 'logic', 'database', 'db')

const run = () => {
    console.log('compress database...')

    // ensure and empty target dir
    fs.ensureDirSync(topath)
    fs.emptyDirSync(topath)

    fs.readdirSync(dbpath).forEach(file => {
        let content = fs.readFileSync(path.resolve(dbpath, file), 'utf8')
        switch (file) {
            case 'entities.nedb':
                content = content.split(/\r?\n/)
                    .filter(line => typeof line !== 'undefined' && line)
                    .map(line => {
                        const json = JSON.parse(line)
                        delete (json.picture)
                        return JSON.stringify(json)
                    })
                    .join("\n") + "\r"
                // fs.writeFile(
                //     path.resolve(topath, file + '.test'),
                //     content,
                //     'utf-8'
                // )
                break
        }
        fs.writeFile(
            path.resolve(topath, file),
            LZString.compressToEncodedURIComponent(content),
            'utf-8'
        )
        console.log('  > ' + file)
    })

    console.log('COMPLETE: compress database')
}

run()