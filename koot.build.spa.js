const path = require('path')
const base = require('koot.build')

module.exports = Object.assign({}, base, {
    dist: path.resolve('./dist-spa/'),
    defines: {
        __SPA__: JSON.stringify(true),
    },
    template: './src/html.ejs'
})
