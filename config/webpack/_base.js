module.exports = {
    // webpack dev server 启动端口
    WEBPACK_DEV_SERVER_PORT: process.env.WEBPACK_DEV_SERVER_PORT || '3001',

    // webpack 打包场景  dev|dist
    WEBPACK_BUILD_ENV: process.env.WEBPACK_BUILD_ENV || 'dist',

    // webpack 打包应用  client|server
    WEBPACK_STAGE_MODE: process.env.WEBPACK_STAGE_MODE || 'client',

    // 自定义app打包名字
    APP_1_ENTER_JS_NAME: 'app',

    // 需要 bable 处理的模块
    needBabelHandleList: []
}