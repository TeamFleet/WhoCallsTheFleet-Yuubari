const proxy = require('koa-proxies');

const { portAkigumo, devPortAkigumo } = require('../../../config/akigumo');

export default async (app) => {
    const target =
        __DEV__ &&
        process.env.YUUBARI_LOCAL_AKIGUMO &&
        JSON.parse(process.env.YUUBARI_LOCAL_AKIGUMO)
            ? `http://localhost:${devPortAkigumo}`
            : process.env.YUUBARI_LOCAL_RUN
            ? `https://akigumo.fleet.moe`
            : `http://localhost:${portAkigumo}`;

    // console.log({
    //     target,
    //     devPortAkigumo,
    //     portAkigumo,
    //     'process.env.YUUBARI_LOCAL_AKIGUMO': process.env.YUUBARI_LOCAL_AKIGUMO,
    //     'process.env.YUUBARI_LOCAL_RUN': process.env.YUUBARI_LOCAL_RUN,
    // });

    app.use(
        proxy('/pics', {
            target,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/pics\//, '/'),
            logs: false,
        })
    );

    app.use(async (ctx, next) => {
        ctx.set(
            'Content-Security-Policy',
            'frame-src *.fleet.moe' + (__DEV__ ? ' localhost' : '')
        );
        ctx.set('X-Frame-Options', '');
        await next();
    });
};
