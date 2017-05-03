const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (appPath) => {
    return [
        new CopyWebpackPlugin([
            {
                from: path.resolve(appPath, './src/client/assets/favicon-32.ico'),
                to: '../favicon.ico'
            },
            {
                from: path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output'),
                to: '_bgimgs'
            }
        ])
    ]
}