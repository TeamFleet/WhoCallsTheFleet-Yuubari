const fs = require('fs-extra');
const path = require('path');

module.exports = /^yuubari/i.test(
    fs.readJsonSync(path.resolve(__dirname, '../package.json')).description
)
    ? 'yuubari'
    : 'stable';
