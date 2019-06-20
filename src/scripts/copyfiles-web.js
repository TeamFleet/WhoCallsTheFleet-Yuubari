const fs = require('fs-extra');
const path = require('path');
// const getDistPath = require('super-project/utils/get-dist-path')
// const packageJson = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'))

const spinner = require('./commons/spinner');

module.exports = async (kootConfig = {}) => {
    const { __CLIENT_ROOT_PATH } = kootConfig;

    const title = 'Copying other files...';
    const waiting = spinner(title);

    // await fs.ensureDir(__CLIENT_ROOT_PATH);

    if (require('../channel') === 'yuubari') {
        // Yuubari channel
        await fs.copy(
            path.resolve(process.cwd(), 'src/assets/public', 'yuubari'),
            path.resolve(__CLIENT_ROOT_PATH)
        );
    } else {
        // Stable channel
        await fs.copy(
            path.resolve(process.cwd(), 'src/assets/public', 'stable'),
            path.resolve(__CLIENT_ROOT_PATH)
        );
    }

    waiting.succeed();
};
