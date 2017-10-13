const customConfig = require('../../../config/webpack')

module.exports = async (getConfig, appPath, defaults = {}) => {
    const list = customConfig.clientApps || ['app']

    if (Array.isArray(list))
        return list.map(async app => {
            if (typeof app === 'object')
                return await getConfig(appPath, app.app, Object.assign({}, defaults, app))
            return await getConfig(appPath, app, defaults)
        })

    if (typeof list === 'object')
        return await getConfig(appPath, list.app, Object.assign({}, defaults, list))

    return await getConfig(appPath, list, defaults)
}