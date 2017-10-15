const Config = require('webpack-config').default
const customConfig = require('../../../config/webpack')

const parse = async (app, getConfig, appPath, defaults = {}) => {
    // console.log(app)
    // getConfig(appPath, app, defaults)

    if (Array.isArray(app))
        return await Promise.all(
            app.map(async thisApp =>
                await parse(thisApp, getConfig, appPath, defaults)
            )
        )

    if (typeof app === 'object') {
        const {
            app: appName,
            [`${process.env.WEBPACK_STAGE_MODE}-${process.env.WEBPACK_BUILD_ENV}`]: currentConfig,
            ...options
        } = app
        return new Config()
            .merge(await getConfig(appPath, appName, Object.assign({}, defaults, options)))
            .merge(currentConfig || {})
        // return await getConfig(appPath, appName, Object.assign({}, defaults, config))
    }

    return await getConfig(appPath, app, defaults)
}

module.exports = async (...args) => await parse(
    await customConfig.clientApps || ['app'],
    ...args
)