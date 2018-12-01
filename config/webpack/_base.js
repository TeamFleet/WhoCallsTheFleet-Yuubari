const path = require('path')

module.exports = {

    entry: {
        critical: [
            path.resolve(__dirname, '../../src/critical.js')
        ],
        polyfill: [
            "@babel/polyfill",
            path.resolve(__dirname, '../../src/polyfill.js')
        ],
    },

    module: {
        rules: [
            {
                test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
                exclude: /node_modules/
            }, {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                exclude: /node_modules/
            }, {
                test: /\.nedb$/,
                loader: 'raw-loader'
            }, {
                test: /\.md$/,
                include: [/docs/],
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [],

}
