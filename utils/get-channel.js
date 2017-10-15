const fs = require('fs')
const path = require('path')

module.exports = () => (
    /^yuubari/i.test(JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')).description)
        ? 'yuubari'
        : 'stable'
)