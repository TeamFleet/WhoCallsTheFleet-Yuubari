const {
    pathNameDistWeb,
    _appName: appName
} = require('../../../config/directories')

module.exports = {
    name: 'Who Calls The Fleet',
    origin: 'https://fleet.moe',
    domain: (() => process.env.SERVER_DOMAIN || 'localhost')(),
    fb_app_id: '',
    pathNameDistWeb,
    pathNameSub: appName,
}