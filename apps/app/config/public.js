module.exports = (() => {
    const thisRoot = require('./root')

    if (__DEV__) return `${thisRoot}dist/`

    const {
        pathNameSub
    } = require('./site')
    return `${thisRoot}${pathNameSub}/`
})()