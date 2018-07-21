const fs = require('fs-extra')
const path = require('path')
// const getDistPath = require('super-project/utils/get-dist-path')
// const packageJson = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'))

const {
    getDistPublic,
} = require('../src/directories')
const spinner = require('./commons/spinner')

module.exports = async () => {
    const pathPublic = getDistPublic()

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
