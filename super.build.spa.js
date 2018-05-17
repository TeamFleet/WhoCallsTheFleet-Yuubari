const path = require('path')
const base = require('./super.build')

module.exports = Object.assign({}, base, {
    dist: path.resolve('./dist-spa/'),
    server: false,
    defines: {
        __SPA__: JSON.stringify(true),
    },
})
