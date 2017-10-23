module.exports = (async () => ({

    app: await require('./app'),
    // api: {
    //     domain: 'api.test.com',
    //     server: require('../../apps/api/index')
    // }

}))()