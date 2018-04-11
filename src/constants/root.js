module.exports = (() => {
    if (__DEV__) return `http://localhost:${process.env.WEBPACK_DEV_SERVER_PORT || 3001}/dist/`
    return `/`
})()