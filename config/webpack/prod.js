const base = require('./_base')

module.exports = Object.assign({}, base, {
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
        ...base.entry,
    },

    // output: {
    //     filename: `core.[chunkhash].js`,
    //     chunkFilename: `chunk.[chunkhash].js`,
    // },

    plugins: [
        ...base.plugins,
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
})
