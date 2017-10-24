const fs = require('fs-extra')
const path = require('path')
// const packageJson = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'))

const {
    distWeb: pathDistWeb,
} = require('../config/directories')

if (require('../config/channel') === 'yuubari') {
    // Yuubari channel
    fs.copySync(
        path.resolve(process.cwd(), 'assets/public', 'yuubari'),
        path.resolve(pathDistWeb, 'public')
    )
} else {
    // Stable channel
    fs.copySync(
        path.resolve(process.cwd(), 'assets/public', 'stable'),
        path.resolve(pathDistWeb, 'public')
    )
}