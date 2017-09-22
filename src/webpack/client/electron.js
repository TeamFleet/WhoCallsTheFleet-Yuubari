const path = require('path')

const getConfig = (appPath, config) => {
    if (Array.isArray(config))
        return config.map(thisConfig => getConfig(appPath, thisConfig))

    const result = Object.assign({}, config, {
        target: 'electron-main',
        // devtool: undefined
    })

    // console.log(' ')
    // console.log(' ')
    // console.log(result)
    // console.log(' ')
    // console.log(' ')

    result.output.path = process.env.WEBPACK_OUTPUT_PATH || path.resolve(appPath, `dist-electron`)

    return result
}

module.exports = async (appPath) => getConfig(appPath, await require('./spa')(appPath))

// module.exports = getConfig(require('./spa'))

