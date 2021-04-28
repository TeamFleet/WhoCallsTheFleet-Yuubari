/* eslint-disable no-console */

module.exports = async (appConfig) => {
    // if (process.env.WEBPACK_BUILD_STAGE === 'client') {
    console.log(' ');

    await require('../scripts/build/prepare-static')(appConfig);
    await require('../scripts/build/prepare-webapp')(appConfig);
    await require('../scripts/build/validate-database-files')(appConfig);
    await require('../scripts/build/validate-less-variables')(appConfig);

    console.log(' ');
    // }

    return;
};
