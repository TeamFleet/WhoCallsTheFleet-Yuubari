const fs = require('fs-extra')
const path = require('path')
// const packageJson = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'))

const {
    dist: {
        public: pathPublic,
    }
} = require('../src/directories')

module.exports = async () => {
    if (require('../src/channel') === 'yuubari') {
        // Yuubari channel
        fs.copySync(
            path.resolve(process.cwd(), 'assets/public', 'yuubari'),
            path.resolve(pathPublic)
        )
    } else {
        // Stable channel
        fs.copySync(
            path.resolve(process.cwd(), 'assets/public', 'stable'),
            path.resolve(pathPublic)
        )
    }
}