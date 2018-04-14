const fs = require('fs')
const path = require('path')

module.exports = /^yuubari/i.test(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8')).description)
    ? 'yuubari'
    : 'stable'

// module.exports = 'yuubari'