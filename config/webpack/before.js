/* eslint-disable no-console */

module.exports = async (kootConfig) => {
    if (process.env.WEBPACK_BUILD_STAGE === 'client') {
        console.log(' ');

        if (!kootConfig.analyze) {
            await require('../../scripts/build/prepare-static')(kootConfig);
            await require('../../src/build/webapp/before')(
                kootConfig
            ).catch((err) => console.error(err));
        }
        // if (process.env.WEBPACK_BUILD_ENV === 'prod') {
        //     await require('../../src/scripts/clean-dist')(kootConfig);
        // }
        await require('../../src/scripts/validate-database-files')(kootConfig);
        await require('../../src/scripts/validate-less-variables')(kootConfig);
        if (!kootConfig.analyze) {
            await require('../../src/scripts/copyfiles')(kootConfig);
        }
        console.log(' ');
    }

    return;
};
