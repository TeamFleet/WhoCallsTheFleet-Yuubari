/*
 * copy all *.webp from /dist-web/public/app/_pics to pics
 */

const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
// const asar = require('asar')
const npmRunScript = require('npm-run-script')

const spinner = require('./build-app/spinner')

const packager = require('electron-packager')
// const elevate = require('node-windows').elevate

// --------------------------------------------------

const {
    packageName,
    isWindows, isMac,
    packageJSON,
    channel,
    symbols
} = require('./build-app/variables')

// --------------------------------------------------

const {
    pathRoot,
    pathPics,
    pathPackage,
    pathPackageJSON,
    pathPackageAssets,
    pathPackageOut
} = require('./build-app/dir')

// --------------------------------------------------

const run = async (src) => {
    console.log('')
    console.log('Building app...')

    let waiting

    // const dest = path.resolve(pathRoot, 'app.asar')

    // determine src path
    // if (!src) src = path.resolve(pathPackage, './WhoCallsTheFleet')
    if (!src) src = pathPackage
    src = path.normalize(src)
    console.log(`${symbols.complete} Target directory: ${src}`)

    // --------------------------------------------------

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
    const env = `cross-env WEBPACK_BUILD_ENV=electron WEBPACK_STAGE_MODE=client WEBPACK_OUTPUT_PATH=${src.replace(/\\/g, '\\\\')}`
    const cmd = `${env} node ./src/webpack/enter`
    await new Promise((resolve, reject) => {
        const child = npmRunScript(cmd, {
            stdio: 'ignore' // quiet
        });
        child.once('error', (error) => {
            console.log(error)
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
    const targetPackageJSON = await fs.existsSync(pathPackageJSON)
        ? fs.readJson(pathPackageJSON)
        : {}
    await fs.writeJson(
        pathPackageJSON,
        Object.assign(targetPackageJSON, {
            "name": packageName.toLocaleLowerCase(),
            "productName": packageName,
            "version": packageJSON.version,
            "description": "Who Calls the Fleet (http://fleet.moe)",
            "main": "index.js",
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

    console.log(`${symbols.complete} Building app complete!`)
    console.log('')

    // --------------------------------------------------

    console.log(`Making distribution packages...`)

    // packaging
    const packagerDefaults = {
        dir: pathPackage,
        name: packageName,
        quiet: true,
        // asar: true,
        arch: "x64",
        out: pathPackageOut
    }
    waiting = spinner(`Clearing packaging output directory`)
    await fs.emptyDir(pathPackageOut)
    waiting.finish()
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
        icon: path.join(pathPackageAssets, `appicon.ico`)
    })
    // await packagerDo({
    //     platform: 'darwin',
    //     icon: path.join(pathPackageAssets, `appicon.icns`)
    // })

    // windows store
    if (isWindows) await require('./build-app/build-uwp')

    // --------------------------------------------------

    console.log(`${symbols.complete} Making distribution packages!`)
    console.log('')
}

run()