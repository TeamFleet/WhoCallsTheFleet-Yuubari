const fs = require('fs-extra')
const path = require('path')
// const packageJson = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'))

const {
    dist: {
        public: pathPublic,
    }
} = require('../src/directories')
const spinner = require('./commons/spinner')

module.exports = async () => {
    const title = 'Copying other files...'
    const waiting = spinner(title)

    await fs.ensureDir(pathPublic)

    if (require('../src/channel') === 'yuubari') {
        // Yuubari channel
        await fs.copy(
            path.resolve(process.cwd(), 'src/assets/public', 'yuubari'),
            path.resolve(pathPublic)
        )
    } else {
        // Stable channel
        await fs.copy(
            path.resolve(process.cwd(), 'src/assets/public', 'stable'),
            path.resolve(pathPublic)
        )
    }

    waiting.succeed()
}
