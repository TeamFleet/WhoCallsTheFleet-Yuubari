const path = require('path');
// const forever = require('forever-monitor');

module.exports = async (kootConfig) => {
    if (
        process.env.WEBPACK_BUILD_STAGE === 'client' &&
        process.env.WEBPACK_BUILD_ENV === 'prod' &&
        !kootConfig.analyze
    ) {
        await require('../../src/scripts/clean-web-sourcemap')(kootConfig);
    }
    await require('../../src/build/webapp/after-server')();

    if (
        process.env.WEBPACK_BUILD_STAGE === 'server' &&
        process.env.WEBPACK_BUILD_ENV === 'dev' &&
        !process.env.YUUBARI_LOCAL_AKIGUMO
    ) {
        const file = path.resolve(__dirname, '../../../Akigumo-dev/start.js');
        const child = require('child_process').fork(
            file,
            [`--port=${kootConfig.devPortAkigumo}`],
            {
                stdio: 'inherit',
                shell: true,
            }
        );
        child.on('close', () => {
            console.warn(`💬 Akigumo(Local) closed.`);
        });
        child.on('error', (...args) => {
            // reject(...args);
        });

        // let child;

        // const exitHandler = async (...args) => {
        //     child.stop();
        // };
        // process.on('exit', exitHandler);
        // process.on('SIGINT', exitHandler);
        // process.on('SIGUSR1', exitHandler);
        // process.on('SIGUSR2', exitHandler);
        // process.on('uncaughtException', exitHandler);

        // if (child) {
        //     child.stop();
        // } else {
        //     child = new forever.Monitor(file, {
        //         max: 1,
        //         silent: false,
        //         uid: `yuubari-local-akigumo`,
        //         killTree: true,
        //         args: [`--port=${kootConfig.devPortAkigumo}`],
        //     });
        //     child.on('watch:restart', function (info) {
        //         console.warn(`💬 Akigumo(Local) restarting`);
        //     });
        //     child.start();
        //
        // }
        console.warn({ file, port: kootConfig.devPortAkigumo, child });
        process.env.YUUBARI_LOCAL_AKIGUMO = true;
    }

    return;
};
