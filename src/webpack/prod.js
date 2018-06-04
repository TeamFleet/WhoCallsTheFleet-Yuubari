const defaults = require('./_factory')()

module.exports = (async () => {
    const config = {
        entry: {
            commons: [
                'react',
                'react-dom',

                'redux',
                'redux-thunk',
                'react-redux',

                'react-router',
                'react-router-redux',

                'react-transition-group',

                // 'localforage',
                'lz-string',
                'metas',
                'classnames',
                'js-cookie',

                'kckit',
            ],
            ...defaults.entry,
        },

        output: {
            filename: `core.[chunkhash].js`,
            chunkFilename: `chunk.[chunkhash].js`,
        },

        plugins: [
            ...defaults.plugins,
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: "commons",
                        chunks: "initial",
                        minChunks: 2
                    }
                }
            }
        }
    }

    return Object.assign({}, defaults, config)
})()
