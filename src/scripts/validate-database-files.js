const LZString = require('lz-string')
const path = require('path')
const fs = require('fs-extra')
const spinner = require('./commons/spinner')

const {
    src: {
        _: pathApp
    },
} = require('../directories')

const dbpath = path.resolve(process.cwd(), 'node_modules', 'whocallsthefleet-database', 'db')
const topath = path.resolve(pathApp, 'database', 'db')
const topathJson = path.resolve(pathApp, 'database', 'json')

/**
 * 预处理所有 .nedb database 文件
 * @async
 */
module.exports = async () => {
    const stepCompressing = spinner('Compressing database...')
    const succeed = []

    // ensure and empty target dir
    fs.ensureDirSync(topath)
    fs.emptyDirSync(topath)
    fs.ensureDirSync(topathJson)
    fs.emptyDirSync(topathJson)

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
        succeed.push(file)
    })

    stepCompressing.succeed()
    succeed.forEach(file => {
        console.log('  > ' + file)
    })

    const stepCollections = spinner('Creating collections...')
    await require('./database/ship-collections.js')(dbpath, topathJson)
    await require('./database/equipment-collections.js')(dbpath, topathJson)
    stepCollections.succeed()
}

// run()
