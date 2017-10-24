const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const platform = os.platform()

const packageJSON = fs.readJSONSync(path.resolve(__dirname, '../../package.json'))

module.exports = {
    packageName: 'WhoCallsTheFleet',

    isWindows: /^win/.test(platform),
    isMac: /^darwin/.test(platform),

    packageJSON,
    channel: require(path.resolve(__dirname, '../../config/channel')),

    symbols: {
        complete: '√'
    },
}