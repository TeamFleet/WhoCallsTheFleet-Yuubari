const path = require('path')
const superBuild = require('super-project/core/webpack/enter')


//

/**
 * 默认环境变量
 * 
 * WEBPACK_BUILD_ENV
 * WEBPACK_BUILD_STAGE
 * SERVER_DOMAIN 运行服务器/测试服务器域名
 * SERVER_PORT 运行服务器/测试服务器端口
 * WEBPACK_DEV_SERVER_PORT Webpack开发服务器端口
 * WEBPACK_ANALYZE Webpack打包结果分析
 */
const {
    WEBPACK_BUILD_ENV: ENV,
    WEBPACK_BUILD_STAGE: STAGE,
} = process.env


//


/**
 * {string} 打包目标目录
 * 默认会在该目录下建立 public 和 server 目录，分别对应 web 服务器和服务器执行代码
 */
const dist = path.resolve('./dist-web/')

/**
 * {object|function} Webpack 配置对象或生成方法，可为异步方法
 */
const config = async () => {
    if (ENV === 'dev') return require('./src/webpack/dev')
    if (ENV === 'prod') return require('./src/webpack/prod')

    return {}
}

/**
 * {object} 目录或文件别名
 * 在项目内的 Javascript 和 CSS/Less/Sass 中的引用方法均可直接使用这些别名，如
 * Javascript: require('@app/create.js')
 * LESS: @import "@app/base.less"
 * 
 * 建议使用绝对路径
 */
const aliases = {
    '@app': path.resolve('./src'),
    '@appConfig': path.resolve('./src/config'),
    '@appUtils': path.resolve('./src/utils'),
    '@appUI': path.resolve('./src/client/ui'),
    '@appLogic': path.resolve('./src/client/logic'),
    "@appData": path.resolve('./src/data'),
    "@appConstants": path.resolve('./src/constants'),
    "@appConst": path.resolve('./src/constants'),
    "@appRedux": path.resolve('./src/redux'),
    '@appLocales': path.resolve('./locales'),
    '@appAssets': path.resolve('./assets'),
    '@appDocs': path.resolve('./docs'),

    "~base.less": path.resolve('./src/client/ui/base.less'),
    "~Assets": path.resolve('./assets'),
    "~/": path.resolve('./src/client/ui')
}

/**
 * {Object|boolean} PWA相关设置，仅在 ENV: prod 环境下生效
 */
const pwa = {
    // pathname: '/service-worker.js',
    // template: path.resolve('./src/sw-template.js'),
    // initialCache: '/**/*',
    // initialCacheAppend: [// real urls],
    initialCacheIgonre: [
        '/bgimgs/**/*',
        '/pics/**/*',
        '/dev-*',
    ]
}

/**
 * {Object} STAGE: client && ENV: dev 环境下的 webpack dev server 配置
 */
const devServer = {}

/**
 * {function} 在 Webpack 打包执行前运行的方法，可为异步
 */
const beforeBuild = async () => {
    if (STAGE === 'client' && ENV === 'prod') {
        await require('./scripts/clean-web')()
    }
}
/**
 * {function} 在 Webpack 打包执行后运行的方法，可为异步
 */
const afterBuild = async () => {
    if (STAGE === 'client' && ENV === 'prod') {
        await require('./scripts/copyfiles-web')()
        await require('./scripts/clean-web-sourcemap')()
    }
}


//


superBuild({
    config,
    dist,
    aliases,
    pwa,
    devServer,
    beforeBuild,
    afterBuild,
})


// {
//     'pwa': {
//         outputPath: path.resolve(pathIncludes, '../'),
//         outputFilename: `service-worker.js`,
//         outputFilenameHash: false,
//         // customServiceWorkerPath: path.normalize(appPath + '/src/client/custom-service-worker.js'),
//         globPattern: `/$includes/**/*`,
//         globOptions: {
//             ignore: [
//                 '/**/_*/',
//                 '/**/_*/**/*',
//                 '/**/chunk.database.*'
//             ]
//         },
//         // appendUrls: getUrlsFromRouter()
//         appendUrls: []
//     }
// },
