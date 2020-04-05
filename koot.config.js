/** @module kootConfig */

/**
 * 路径名，可为相对路径或绝对路径。由于部分代码使用了 import/export 的写法，node.js 无法直接识别，需要 webpack/babel 进行编译，故在部分环境下使用该写法代替 require()。
 * @typedef {String} Pathname
 */

/**
 * @callback cacheGet
 * 缓存检查与吐出方法
 * @param {String} url
 * @return {Boolean|String} 对该 URL 不使用缓存时返回 false，使用时返回缓存结果 String
 */

/**
 * @callback cacheSet
 * 缓存存储方法
 * @param {String} url
 * @param {String} html
 */

const path = require('path');

const { static: dirStatic } = require('./src/directories');
const configAkigumo = require('./config/akigumo');

/** @type {Boolean} 判断当前是否是生产环境 */
// const isEnvProd = Boolean(process.env.WEBPACK_BUILD_ENV === 'prod')
/** @type {Boolean} 判断当前是否是开发环境 */
// const isEnvDev = Boolean(process.env.WEBPACK_BUILD_ENV === 'dev')

/** @type {Boolean} 判断当前是否是客户端 */
// const isStageClient = Boolean(process.env.WEBPACK_BUILD_STAGE === 'client')
/** @type {Boolean} 判断当前是否是服务器端 */
// const isStageServer = Boolean(process.env.WEBPACK_BUILD_STAGE === 'server')

module.exports = {
    /**************************************************************************
     * 项目信息
     *************************************************************************/

    name: 'The Fleet (Yuubari)',
    dist: './dist-webapp/',

    template: './src/template.ejs',
    templateInject: './src/_server/inject.js',

    routes: './src/router',

    store: './src/redux/factory-store',
    sessionStore: {
        equipmentList: true,
        shipList: true,
    },

    // i18n: {
    //     // type: ENV === 'dev' ? 'redux' : 'default', // default | redux
    //     type: 'redux',
    //     // expr: '__',
    //     locales: require('./src/locales/index').map(l => [
    //         l,
    //         `./src/locales/${l}.json`
    //     ])
    //     // cookieKey: 'fleetLocaleId',
    //     // domain: '127.0.0.1',
    // },
    i18n:
        process.env.quickStart && !process.env.quickStartAllLocales
            ? [['zh', `./src/locales/zh.json`]]
            : require('./src/locales').map((l) => [
                  l,
                  `./src/locales/${l}.json`,
              ]),

    serviceWorker: {
        auto: false,
        exclude: ['/bgimgs/**/*', '/pics/**/*', '/dev-*'],
        cacheFirst: ['/bgimgs/', '/pics/'],
    },

    aliases: {
        '@src': path.resolve('./src'),
        '@docs': path.resolve('./docs'),
        '@locales': path.resolve('./src/locales'),
        '@assets': path.resolve('./src/assets'),

        '@app': path.resolve('./src'),
        '@utils': path.resolve('./src/utils'),
        '@ui': path.resolve('./src/ui'),
        '@components': path.resolve('./src/ui/components'),
        '@api': path.resolve('./src/api'),
        '@const': path.resolve('./src/constants'),
        '@redux': path.resolve('./src/redux'),
        '@actions': path.resolve('./src/api/actions'),
        '@db': path.resolve('./src/database'),
        '@database': path.resolve('./src/database'),

        '~base.less': path.resolve('./src/ui/base.less'),
        '~Assets': path.resolve('./src/assets'),
        '~/': path.resolve('./src/ui'),
    },

    defines: require('./src/defines'),

    staticCopyFrom: [dirStatic],

    /**************************************************************************
     * 客户端生命周期
     *************************************************************************/

    before: './src/_client/before',
    after: './src/_client/after',
    onHistoryUpdate: './src/_client/on-history-update',
    onRouterUpdate: './src/_client/on-router-update',

    /**************************************************************************
     * 服务器端设置 & 生命周期
     *************************************************************************/

    port: 8080,
    // renderCache: {
    //     maxAge: 10 * 1000,
    // },
    renderCache: false,
    proxyRequestOrigin: {
        protocol:
            process.env.WEBPACK_BUILD_ENV === 'prod' ? 'https' : undefined,
    },
    koaStatic: {
        maxage: 0,
        hidden: true,
        index: 'index.html',
        defer: false,
        gzip: true,
        extensions: false,
    },
    serverBefore: './src/_server/lifecycle/before',
    serverAfter: './src/_server/lifecycle/after',
    serverOnRender: {
        beforePreRender: './src/_server/lifecycle/before-pre-render',
    },

    /**************************************************************************
     * Webpack 相关
     *************************************************************************/

    webpackConfig: require('./config/webpack'),
    webpackBefore: require('./config/webpack/before'),
    webpackAfter: require('./config/webpack/after'),
    moduleCssFilenameTest: /^((?!\.g\.).)*/,
    classNameHashLength: 8,

    /**************************************************************************
     * 开发环境
     *************************************************************************/

    devPort: 8703,
    devMemoryAllocation: 2048,

    /**************************************************************************
     * Project Specific
     *************************************************************************/
    ...configAkigumo,
};
