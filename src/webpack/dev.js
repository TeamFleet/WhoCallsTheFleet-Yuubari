const config = require('./_factory')()

module.exports = (async () =>
    Object.assign({}, config, {

        entry: {
            ...config.entry,
        },

        plugins: [
            ...config.plugins,
        ],

    })
)()
