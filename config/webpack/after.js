module.exports = async kootConfig => {
    if (
        process.env.WEBPACK_BUILD_STAGE === 'client' &&
        process.env.WEBPACK_BUILD_ENV === 'prod' &&
        !kootConfig.analyze
    ) {
        await require('../../src/scripts/clean-web-sourcemap')(kootConfig);
    }
    await require('../../src/build/webapp/after-server')();
    return;
};
