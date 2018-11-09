const path = require('path')
const base = require('koot.config')

module.exports = Object.assign({}, base, {
    dist: path.resolve('./dist-spa/'),
    defines: {
        __SPA__: JSON.stringify(true),
    }
})
