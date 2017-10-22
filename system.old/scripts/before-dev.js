const fs = require('fs-extra')
const path = require('path')
const common = require('../webpack/common')

fs.ensureFileSync(path.resolve(
    process.cwd(),
    `${common.outputPath}/server/index.js`
))