const fs = require('fs-extra')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const channel = /^yuubari/i.test(fs.readJSONSync(path.resolve(process.cwd(), 'package.json')).description) ? 'yuubari' : 'stable'

module.exports = (appPath) => {
    return [
        new CopyWebpackPlugin([
            {
                from: path.resolve(appPath, `./src/client/assets/logos/${channel}/32.ico`),
                to: '../favicon.ico'
            },
            {
                from: path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output'),
                to: '_bgimgs'
            }
        ])
    ]
}