const fs = require('fs-extra')
const path = require('path')

const times = require('../../src/app/utils/times')
const spinner = require('./spinner')

const convertToWindowsStore = require('electron-windows-store')
const isAdminUser = require('node-windows').isAdminUser
const fileBuild = path.resolve(__dirname, './build-uwp.txt')

// --------------------------------------------------

const {
    packageName,
    isWindows, isMac,
    packageJSON,
    channel,
    symbols
} = require('./variables')

// --------------------------------------------------

const {
    pathRoot,
    pathPics,
    pathPackage,
    pathPackageJSON,
    pathPackageAssets,
    pathPackageOut
} = require('./dir')

// --------------------------------------------------

const run = async () => {
    const waiting = spinner(`Making APPX for UWP`)

    if (!isWindows) {
        waiting.finish()
        console.log('× Requires Windows')
        return
    }

    const sign = require('electron-windows-store/lib/sign')
    const publisher = 'CN=43EB8253-2612-4378-9B96-6A35957E0E07'
    const publisherId = publisher.split('=')[1]
    const windowsKit = 'C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.15063.0\\x64'
    const certFilePath = path.join(process.env.APPDATA, 'electron-windows-store', publisherId)
    const build = await fs.readFile(fileBuild, 'utf-8')
    const buildNumber = parseInt(build) + 1

    // console.log(build, buildNumber)

    let devCert = path.resolve(certFilePath, `${publisher}.pfx`)
    if (!fs.existsSync(devCert)) {
        await sign.makeCert({
            publisherName: publisher,
            certFilePath,
            program: {
                windowsKit
            }
        })
            .then(pfxFile => {
                devCert = pfxFile
            })
    }

    await convertToWindowsStore({
        // containerVirtualization: false,
        inputDirectory: path.resolve(pathPackageOut, `${packageName}-win32-x64`),
        outputDirectory: path.resolve(pathPackageOut, `${packageName}-appx`),
        flatten: true,

        packageVersion: (() => {
            const split = packageJSON.version.split('.')
            if (split.length < 4)
                times(4 - split.length)(() => {
                    split.push(buildNumber)
                })
            return split.join('.')
        })(),
        packageName: `${packageName}`,
        packageDisplayName: packageName,
        packageDescription: packageJSON.description,
        packageExecutable: `app/${packageName}.exe`,

        assets: path.normalize(path.join(pathRoot, `src/app/client/assets/uwp/${channel}/assets`)),
        manifest: path.normalize(path.join(pathRoot, `src/app/client/assets/uwp/${channel}/AppXManifest.xml`)),
        // deploy: false,

        publisher,
        windowsKit,
        devCert,
        // desktopConverter: 'C:\\desktop-converter-tools',
        // expandedBaseImage: 'C:\\base-image.wim',
        // makeappxParams: ['/l'],
        // signtoolParams: ['/p'],
        // makePri: true,
        // createConfigParams: ['/a'],
        // createPriParams: ['/b'],
    })

    await fs.writeFile(
        fileBuild,
        buildNumber
    )

    waiting.finish()
}

// run()

return new Promise((resolve, reject) => {
    isAdminUser(isAdmin => {
        if (isAdmin) {
            // console.log('The user has administrative privileges.');
            resolve()
        } else {
            console.log('NOT AN ADMIN');
            reject()
        }
    })
}).then(run)
