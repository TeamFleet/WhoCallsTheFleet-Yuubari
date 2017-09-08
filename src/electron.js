const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const fs = require('fs-extra')
const url = require('url')

const pathRoot = path.join(__dirname, '../')
const pathApp = path.join(pathRoot, 'dist-app/')
const pathSrc = path.join(pathRoot, 'src/')
const pathAssets = path.join(pathSrc, 'app/client/assets/')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const os = require('os')
const platform = os.platform()
const isWindows = /^win/.test(platform)
const isMac = /^darwin/.test(platform)

const channel = /^yuubari/i.test(fs.readJSONSync(path.resolve(process.cwd(), 'package.json')).description) ? 'yuubari' : 'stable'

const getAppIcon = () => {
    if (isWindows)
        return path.join(pathAssets, `appicon.ico`)
    if (isMac)
        return path.join(pathAssets, `appicon.icns`)
    return path.join(pathAssets, `/logos/${channel}/128.png`)
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 480,
        minHeight: 480,
        center: true,

        icon: getAppIcon(),

        backgroundColor: '#263238'
    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(pathApp, '/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // disable menubar for Windows / Linux
    mainWindow.setMenu(null)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
