// console.log(new Date())
// console.log(process.env)
// console.log('__CLIENT__', __CLIENT__)

module.exports = (async () => ({

    // 
    domain: require('../../../src/config/site').domain,
    server: global.NOT_WEBPACK_RUN
        ? await require('../../../src/server').default()
        : '',

    //
    webpack: {
        client: await (async () => {
            const {
                WEBPACK_BUILD_STAGE: STAGE,
                WEBPACK_BUILD_ENV: ENV,
            } = process.env

            if (STAGE === 'client' && ENV === 'dev') return await require('./client-dev')
            if (STAGE === 'client' && ENV === 'dist') return await require('./client-dist')

            if (STAGE === 'server' && ENV === 'dev') return await require('./client-dev')
            if (STAGE === 'server' && ENV === 'dist') return await require('./client-dist')

            return {}
        })()
    }
}))()
