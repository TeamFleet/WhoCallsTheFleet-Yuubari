const path = require('path')
const base = require('./super.build')

module.exports = Object.assign({}, base, {
    dist: path.resolve('./dist-web-qa/'),
    defines: {
        __QA__: JSON.stringify(true),
    },
})
