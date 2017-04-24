const path = require('path')

module.exports = (appPath) => {
    return {
        "critical-extra-old-ie": [
            "babel-polyfill",
            path.resolve(appPath, './src/client/critical.extra-old-ie.js')
        ],
        critical: [
            path.resolve(appPath, './src/client/critical')
        ],
        client: [
            path.resolve(appPath, './src/client')
        ]
    }
}