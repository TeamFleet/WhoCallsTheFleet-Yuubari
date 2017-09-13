/*
 * copy all *.webp from /dist-web/public/app/_pics to pics
 */

const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const ora = require('ora')
// const asar = require('asar')
const packager = require('electron-packager')
const npmRunScript = require('npm-run-script')

const symbols = {
    complete: '√'
}

const spinner = (options = {}) => {
    const waiting = ora(
        Object.assign(
            {
                spinner: 'dots',
                color: 'cyan'
            },
            typeof options === 'string' ? {
                text: options
            } : options
        )
    ).start()
    waiting.finish = (options = {}) => {
        waiting.color = 'green'
        waiting.stopAndPersist(Object.assign({
            symbol: symbols.complete
        }, options))
    }
    return waiting
}

const run = async (src) => {
    console.log('')
    console.log('Building app...')

    let waiting
    // const dirPackage = 'app-electron'

    const pathRoot = path.resolve(__dirname, '../')
    // const pathApp = path.resolve(pathRoot, './dist-app')
    const pathPics = path.resolve(pathRoot, './dist-web/public/app/_pics')
    // const pathPackage = path.resolve(pathRoot, `../${dirPackage}/src`)
    const pathPackage = path.resolve(pathRoot, `./dist-app-package/pkg/src`)
    const pathPackageJSON = path.resolve(pathPackage, '../package.json')

    // const dest = path.resolve(pathRoot, 'app.asar')

    // determine src path
    // if (!src) src = path.resolve(pathPackage, './WhoCallsTheFleet')
    if (!src) src = pathPackage
    src = path.resolve(src)
    console.log(`${symbols.complete} Target directory: ${src}`)

    // make sure and empty package directory
    waiting = spinner(`Making sure that target directory empty`)
    await fs.emptyDir(pathPackage)
    waiting.finish()

    // copy files to src directory
    // console.log(`> copying files to source directory...`)
    // await fs.copy(pathApp, src)
    // console.log(`  > complete!`)

    // build app into src directory
    waiting = spinner(`Building app into target directory`)
    const env = `cross-env WEBPACK_BUILD_ENV=app WEBPACK_STAGE_MODE=client WEBPACK_OUTPUT_PATH=${src}`
    const cmd = `${env} npm run copy:spa && ${env} node ./src/webpack/enter`
    await new Promise((resolve, reject) => {
        const child = npmRunScript(cmd, {
            stdio: 'ignore' // quiet
        });
        child.once('error', (error) => {
            process.exit(1);
            reject(error);
        });
        child.once('exit', (exitCode) => {
            // process.exit(exitCode);
            resolve();
        });
    })
    waiting.finish()

    // copy pics to src directory
    waiting = spinner(`Copying pics to target directory`)
    await new Promise((resolve, reject) => glob(
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
    }))/*.then(count => {
        console.log(`  > Copied ${count} files!`)
    })*/
    // console.log(pics)
    waiting.finish()

    // copy startup js to src
    waiting = spinner(`Creating & copying other files`)
    await fs.copy(path.resolve(pathRoot, 'src/electron.js'), path.resolve(pathPackage, 'index.js'))
    // await fs.writeJson(path.resolve(pathPackage, 'package.json'), {
    //     "name": "whocallsthefleet",
    //     "version": fs.readJSONSync(path.resolve(pathRoot, 'package.json')).version,
    //     "main": "main.js",
    //     "description": "Who Calls the Fleet (http://fleet.moe)",
    //     "author": {
    //         "name": "Diablohu",
    //         "email": "diablohudream@gmail.com",
    //         "url": "http://diablohu.com"
    //     },
    //     "license": "MIT",
    //     // "repository": {
    //     //     "type": "git",
    //     //     "url": "https://github.com/Diablohu/WhoCallsTheFleet"
    //     // },
    //     "scripts": {
    //         "start": "node ./main"
    //     },
    //     "dependencies": {
    //     },
    //     "devDependencies": {
    //         "electron": "1.7.6"
    //     }
    // })
    const targetPackageJSON = await fs.readJson(pathPackageJSON) || {}
    await fs.writeJson(
        pathPackageJSON,
        Object.assign(targetPackageJSON, {
            "name": "whocallsthefleet",
            "productName": "WhoCallsTheFleet",
            "version": fs.readJSONSync(path.resolve(pathRoot, 'package.json')).version,
            "description": "Who Calls the Fleet (http://fleet.moe)",
            "main": "src/index.js",
            "author": {
                "name": "Diablohu",
                "email": "diablohudream@gmail.com",
                "url": "http://diablohu.com"
            },
            "license": "MIT",
            "repository": {
                "type": "git",
                "url": "https://github.com/TeamFleet/WhoCallsTheFleet-app"
            },
        }), {
            spaces: 4
        }
    )
    waiting.finish()

    // installing node packages
    // console.log(`> installing npm packages...`)
    // await new Promise((resolve, reject) => {
    //     const child = npmRunScript(
    //         `npm --prefix ./${dirPackage} install ./${dirPackage}`,
    //         // {
    //         //     stdio: 'ignore' // quiet
    //         // }
    //     );
    //     child.once('error', (error) => {
    //         process.exit(1);
    //         reject(error);
    //     });
    //     child.once('exit', (exitCode) => {
    //         // process.exit(exitCode);
    //         resolve();
    //     });
    // })
    // console.log(`  > complete!`)

    // packaging
    // waiting = spinner(`Packaging`)
    // await new Promise((resolve, reject) => {
    //     asar.createPackage(src, dest, () => {
    //         console.log(`  > complete! ${dest}`)
    //         resolve()
    //     })
    // })
    // waiting.finish()

    // packaging
    const pathAssets = path.resolve(pathPackage, 'assets')
    const packagerDefaults = {
        dir: pathPackage,
        name: "WhoCallsTheFleet",
        quiet: true,
        // asar: true,
        arch: "x64",
        // out: pathPackage
    }
    const packagerDo = async (options = {}) => {
        const settings = Object.assign({}, packagerDefaults, options)
        waiting = spinner(`Packaging ${settings.platform}-${settings.arch}`)
        // console.log(settings)
        await packager(settings)
            .catch(err => console.log(err))
        // console.log(`    > built: ${settings.platform}-${settings.arch}`)
        waiting.finish()
    }
    await packagerDo({
        platform: 'win32',
        icon: path.join(pathAssets, `appicon.ico`)
    })
    // await packagerDo({
    //     platform: 'darwin',
    //     icon: path.join(pathAssets, `appicon.icns`)
    // })

    console.log(`${symbols.complete} Building app complete!`)
    console.log('')
}

run()