module.exports = Object.assign({}, require('./koot.config'), {
    type: 'react-spa',
    dist: (() => {
        if (process.env.WEBPACK_BUILD_ENV === 'dev')
            return './dev-spa/'
        return './dist-spa/'
    })(),
    defines: {
        __SPA__: JSON.stringify(true),
    },
    inject: './spa/inject.js'
})
