// 重写 webpack 的 rules 属性

const ExtractTextPlugin = require("extract-text-webpack-plugin")

const dirs = require('../directories')
const {
    WEBPACK_BUILD_ENV: env
} = require('./_base')

// const extractCriticalCSS = new ExtractTextPlugin('[name].[chunkhash].css');
const useSpCssLoader = 'sp-css-loader?length=8&mode=replace'
const useUniversalAliasLoader = {
    loader: "universal-alias-loader",
    options: {
        alias: {
            "~base.less": dirs.appUI + '/base.less',
            "~Assets": dirs.assets,
            "~/": dirs.appUI + '//'
        }
    }
}

module.exports = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    },

    // CSS - general
    {
        test: /\.css$/,
        exclude: [/\.g\.css$/, /node_modules/],
        use: [
            useSpCssLoader,
            "postcss-loader",
            useUniversalAliasLoader
        ]
        // loader: 'sp-css-loader?length=8&mode=replace!postcss-loader'
    }, {
        test: /\.less$/,
        exclude: [/\.g\.less$/, /node_modules/],
        use: [
            useSpCssLoader,
            "postcss-loader",
            "less-loader",
            useUniversalAliasLoader
        ]
    }, {
        test: /\.scss$/,
        exclude: [/\.g\.scss$/, /node_modules/],
        use: [
            useSpCssLoader,
            "postcss-loader",
            "sass-loader",
            useUniversalAliasLoader
        ]
    },

    // CSS - in node_modules
    {
        test: /\.css$/,
        include: /node_modules/,
        use: [
            "style-loader",
            "postcss-loader"
        ]
    }, {
        test: /\.less$/,
        include: /node_modules/,
        use: [
            "style-loader",
            "postcss-loader",
            "less-loader"
        ]
    }, {
        test: /\.scss$/,
        include: /node_modules/,
        use: [
            "style-loader",
            "postcss-loader",
            "sass-loader"
        ]
    },

    // CSS - critical
    {
        test: env === 'dist' ? /critical\.g\.css$/ : /^IMPOSSIBLE$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader"]
        })
    }, {
        test: env === 'dist' ? /critical\.g\.less$/ : /^IMPOSSIBLE$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "less-loader"]
        })
    }, {
        test: env === 'dist' ? /critical\.g\.scss$/ : /^IMPOSSIBLE$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "sass-loader"]
        })
    },

    // CSS - other global
    {
        test: /\.g\.css$/,
        exclude: env === 'dist' ? /critical\.g\.css$/ : undefined,
        loader: 'style-loader!postcss-loader'
    }, {
        test: /\.g\.less$/,
        exclude: env === 'dist' ? /critical\.g\.less$/ : undefined,
        loader: 'style-loader!postcss-loader!less-loader'
    }, {
        test: /\.g\.scss$/,
        exclude: env === 'dist' ? /critical\.g\.scss$/ : undefined,
        loader: 'style-loader!postcss-loader!sass-loader'
    },

    //

    {
        test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
        loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
        exclude: /node_modules/
    }, {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        exclude: /node_modules/
    }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
    }, {
        test: /\.nedb$/,
        loader: 'raw-loader'
    }, {
        test: /\.md$/,
        include: [/docs/],
        loader: 'raw-loader'
    }
]