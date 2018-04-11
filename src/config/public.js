module.exports = (() => {
    const thisRoot = require('./root')

    if (__DEV__) return `${thisRoot}`

    const {
        pathNameSub
    } = require('./site')
    return `${thisRoot}${pathNameSub}/`
})()