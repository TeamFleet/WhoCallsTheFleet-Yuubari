const fs = require('fs-extra');
const path = require('path');
const copyfiles = require('../utils/copyfiles');

/**
 * 在服务器端打包完成后
 * @async
 */
const buildServerAfter = async ({ dist }) => {
    if (process.env.WEBPACK_BUILD_ENV !== 'prod') return;

    const folder = path.resolve(__dirname, 'files-server-deploy');

    await copyfiles(
        fs
            .readdirSync(folder)
            .map((filename) => path.resolve(folder, filename)),
        'Copying server files that for deployment purpose'
    );
};

module.exports = buildServerAfter;
