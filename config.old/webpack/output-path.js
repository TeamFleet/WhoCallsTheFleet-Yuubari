// 打包结果目录

const base = require('./_base')

module.exports = (() => {
    if (base.WEBPACK_BUILD_ENV === 'spa')
        return 'dist-spa'
    if (base.WEBPACK_BUILD_ENV === 'electron' || base.WEBPACK_BUILD_ENV === 'app')
        return 'dist-electron'
    return 'dist-web'
})()