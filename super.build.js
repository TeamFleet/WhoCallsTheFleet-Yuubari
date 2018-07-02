/**
 * 项目构建/打包配置
 * 该文件会在 webpack 打包前载入
 * 
 * 无法加载 ES6 module
 * 无法使用 webpack.definePlugin 中定义的变量
 * 
 * @module super.build
 */

const path = require('path')
const fs = require('fs-extra')

module.exports = {
    /** 
     * 打包目标目录
     * 默认会在该目录下建立 public 和 server 目录，分别对应 web 服务器和服务器执行代码
     * 注：如果为相对路径，请确保第一个字符为 .
     * @type {string}
     */
    dist: './dist-web/',

    /** 
     * Webpack 配置对象或生成方法，可为异步方法
     * @type {(Object|Function)}
     */
    config: async () => {
        if (process.env.WEBPACK_BUILD_ENV === 'dev')
            return await require('./src/webpack/dev')
        if (process.env.WEBPACK_BUILD_ENV === 'prod')
            return await require('./src/webpack/prod')
        return {}
    },

    /** 
     * 目录或文件别名
     * 
     * 在项目内的 JavaScript 和 CSS/LESS/SASS 中的引用方法均可直接使用这些别名，如
     *      - JavaScript: require('@app/create.js')
     *      - LESS:       @import "~base.less"
     * 
     * 建议使用绝对路径
     * 
     * @type {Object}
     */
    aliases: {
        '@src': path.resolve('./src'),
        '@docs': path.resolve('./docs'),
        '@locales': path.resolve('./src/locales'),
        '@assets': path.resolve('./src/assets'),

        '@app': path.resolve('./src/app'),
        '@utils': path.resolve('./src/app/utils'),
        '@ui': path.resolve('./src/app/ui'),
        '@api': path.resolve('./src/app/api'),
        "@const": path.resolve('./src/app/constants'),
        "@redux": path.resolve('./src/app/redux'),
        '@actions': path.resolve('./src/app/api/actions'),

        "~base.less": path.resolve('./src/app/ui/base.less'),
        "~Assets": path.resolve('./src/assets'),
        "~/": path.resolve('./src/app/ui')
    },

    /** 
     * 服务器运行端口
     * @type {(Number|Object|string)}
     */
    // port: 8080,
    port: {
        dev: 8703,
        prod: 8080,
    },

    /** 
     * 多语言配置
     * @type {(Boolean|Array[]|Object)}
     */
    // i18n: false,
    // i18n: [
    //     ['zh', './locales/zh.json'],
    //     ['en', './locales/en.json'],
    //     ['ja', './locales/ja.json'],
    // ],
    i18n: {
        // type: ENV === 'dev' ? 'redux' : 'default', // default | redux
        type: 'redux',
        // expr: '__',
        locales: require('./src/locales')
            .map(l => ([l, `./src/locales/${l}.json`]))
        // cookieKey: 'fleetLocaleId',
        // domain: '127.0.0.1',
    },

    /** 
     * PWA相关设置，仅在生产环境(ENV:prod)下生效
     * @type {(Object|boolean)}
     * @namespace
     * @property {Boolean} [auto=true] - 是否自动注册 service-worker
     * @property {string} [pathname="/service-worker.js"] - service-worker 文件输出路径
     * @property {string} [template] - 自定义 service-worker 模板文件路径
     * @property {string} [initialCache] - 初始缓存文件路径 glob
     * @property {string[]} [initialCacheAppend] - 追加初始缓存 URL
     * @property {string[]} [initialCacheIgonre] - 初始缓存列表中的忽略项
     */
    pwa: {
        auto: false,
        // pathname: '/service-worker.js',
        // template: path.resolve('./src/sw-template.js'),
        // initialCache: '/**/*',
        // initialCacheAppend: [// real urls],
        initialCacheIgonre: [
            '/bgimgs/**/*',
            '/pics/**/*',
            '/dev-*',
        ]
    },

    /** 
     * webpack-dev-server 配置，仅在开发环境(ENV:dev)下生效
     * @type {Object}
     */
    devServer: {},

    /** 
     * 在 Webpack 打包执行前运行的方法，可为异步
     * @type {Function}
     */
    beforeBuild: async (args) => {
        if (process.env.WEBPACK_BUILD_STAGE === 'client') {
            console.log(' ')
            if (process.env.WEBPACK_BUILD_ENV === 'prod') {
                await require('./scripts/clean-web')(args)
            }
            await require('./scripts/database')()
            await require('./scripts/less-variables')()
            await require('./scripts/copyfiles')(args)
            await require('./scripts/copyfiles-web')()
        }
        return
    },

    /** 
     * 在 Webpack 打包完成后运行的方法，可为异步
     * @type {Function}
     */
    afterBuild: async () => {
        if (process.env.WEBPACK_BUILD_STAGE === 'client' &&
            process.env.WEBPACK_BUILD_ENV === 'prod'
        ) {
            await require('./scripts/clean-web-sourcemap')()
        }
        return
    },

    /** 
     * 扩展 webpack.DefinePlugin 的内容
     * @type {Object}
     */
    defines: {},

    /** 
     * 强制指定模板文件地址，覆盖 super.js 中的配置
     * @type {string}
     */
    // template: './src/app/template.ejs',

    /** 
     * 强制指定注入，覆盖 super.js 中的配置
     * @type {Object}
     */
    // inject: {},
}
