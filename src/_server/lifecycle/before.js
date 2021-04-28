const proxy = require('koa-proxies');

const { portAkigumo, devPortAkigumo } = require('../../../config/akigumo');

export default async (app) => {
    app.use(
        proxy('/pics', {
            target:
                __DEV__ &&
                process.env.YUUBARI_LOCAL_AKIGUMO &&
                JSON.parse(process.env.YUUBARI_LOCAL_AKIGUMO)
                    ? `http://localhost:${devPortAkigumo}`
                    : process.env.YUUBARI_LOCAL_RUN
                    ? `https://akigumo.fleet.moe`
                    : `http://localhost:${portAkigumo}`,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/pics\//, '/'),
            logs: false,
        })
    );
};
