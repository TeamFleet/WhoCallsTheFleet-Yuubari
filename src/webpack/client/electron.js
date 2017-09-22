const path = require('path')

const getConfig = (appPath, config) => {

    if (Array.isArray(config))
        return config.map(thisConfig => getConfig(appPath, thisConfig))

    const result = Object.assign({}, config, {
        target: 'electron-main',
        devtool: undefined
    })

    result.output.path = process.env.WEBPACK_OUTPUT_PATH
        ? path.normalize(process.env.WEBPACK_OUTPUT_PATH)
        : path.resolve(appPath, `dist-electron`)

    // console.log(' ')
    // console.log(' ')
    // console.log(process.env.WEBPACK_OUTPUT_PATH)
    // console.log(' ')
    // console.log(' ')

    return result
}

module.exports = async (appPath) => getConfig(appPath, await require('./spa')(appPath))

// module.exports = getConfig(require('./spa'))

