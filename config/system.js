module.exports = {

    // cookie serect key
    COOKIE_KEYS: ['super-project-key'],

    // 系统服务启动端口
    SERVER_PORT: process.env.SERVER_PORT || (process.env.WEBPACK_BUILD_ENV === 'dev' ? '3000' : '8080'),
}