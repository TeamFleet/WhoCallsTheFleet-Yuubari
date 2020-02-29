const fs = require('fs-extra');
const path = require('path');
const getDistPath = require('koot/utils/get-dist-path');

/**
 * 在服务器端打包完成后
 * @async
 */
const buildServerAfter = async () => {
    if (
        process.env.WEBPACK_BUILD_STAGE !== 'server' ||
        process.env.WEBPACK_BUILD_ENV !== 'prod'
    )
        return;

    /** @type {String} 打包结果路径 */
    const dist = getDistPath();

    // 复制文件
    const from = path.resolve(__dirname, 'files-server-deploy');
    for (const filename of fs.readdirSync(from)) {
        await fs.copyFile(
            path.resolve(from, filename),
            path.resolve(dist, filename)
        );
    }
};

module.exports = buildServerAfter;
