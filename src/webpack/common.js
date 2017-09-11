const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const appPath = process.cwd()
const env = process.env.WEBPACK_BUILD_ENV || 'dev'
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractCriticalCSS = new ExtractTextPlugin('[name].[chunkhash].css');
const pathBgimgs = path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output')

// 执行顺序，从右到左
const rules = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    },

    // CSS - general
    {
        test: /\.css$/,
        exclude: [/\.g\.css$/, /node_modules/],
        loader: 'sp-css-loader?length=8&mode=replace!postcss-loader'
    }, {
        test: /\.less$/,
        exclude: [/\.g\.less$/, /node_modules/],
        loader: 'sp-css-loader?length=8&mode=replace!postcss-loader!less-loader'
    }, {
        test: /\.scss$/,
        exclude: [/\.g\.scss$/, /node_modules/],
        loader: 'sp-css-loader?length=8&mode=replace!postcss-loader!sass-loader'
    },

    // CSS - in node_modules
    {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style-loader!postcss-loader'
    }, {
        test: /\.less$/,
        include: /node_modules/,
        loader: 'style-loader!postcss-loader!less-loader'
    }, {
        test: /\.scss$/,
        include: /node_modules/,
        loader: 'style-loader!postcss-loader!sass-loader'
    },

    // CSS - critical
    {
        test: env === 'dist' ? /critical\.g\.css$/ : /^IMPOSSIBLE$/,
        use: extractCriticalCSS.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader"]
        })
    }, {
        test: env === 'dist' ? /critical\.g\.less$/ : /^IMPOSSIBLE$/,
        use: extractCriticalCSS.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "less-loader"]
        })
    }, {
        test: env === 'dist' ? /critical\.g\.scss$/ : /^IMPOSSIBLE$/,
        use: extractCriticalCSS.extract({
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
        test: /\.(ico|gif|jpg|jpeg|png|svg|webp)$/,
        loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
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

// 执行顺序，？
const plugins = [
    extractCriticalCSS,

    new webpack.DefinePlugin({
        '__CHANNEL__': JSON.stringify(
            process.env.WEBPACK_BUILD_ENV === 'app'
                ? 'stable'
                : (
                    /^yuubari/i.test(fs.readJSONSync(path.resolve(process.cwd(), 'package.json')).description)
                        ? 'yuubari'
                        : 'stable'
                )
        ),
        '__BGIMG_LIST__': JSON.stringify(
            // glob.sync(path.resolve(pathBgimgs, '*.jpg'))
            fs.readdirSync(pathBgimgs).filter(
                file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
            )
        ),
        '__ICONSVG__': JSON.stringify(
            fs.readFileSync(
                path.resolve(appPath, './src/app/client/assets/symbols/symbol-defs.svg'), 'utf8'
            ).replace(/<title>(.+?)<\/title>/g, '')
        )
    })
]

const resolve = {
    modules: [
        'node_modules',
        path.resolve(appPath, './src/modules')
    ],
    alias: {
        Apps: path.resolve(appPath, './src/apps'),
        Locales: path.resolve(appPath, './locales'),

        "@app": path.resolve(appPath, './src/app'),
        "@appConfig": path.resolve(appPath, './src/app/config'),
        "@appLocales": path.resolve(appPath, './locales'),
        "@appUtils": path.resolve(appPath, './src/app/utils'),
        "@appData": path.resolve(appPath, './src/app/data'),
        "@appAssets": path.resolve(appPath, './src/app/client/assets'),
        "@appUI": path.resolve(appPath, './src/app/client/ui'),
        "@appLogic": path.resolve(appPath, './src/app/client/logic'),
        "@appDocs": path.resolve(appPath, './docs')
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.less']
}

// 这里配置需要babel处理的node_modules
// 大部分是自己用es6语法写的模块
const needBabelHandleList = [
    'super-project',
    'sp-base',
    'sp-boilerplate',
    'sp-css-import',
    'sp-css-loader',
    'sp-mongo',
    'sp-api',
    'sp-cors-middleware',
    'sp-react-isomorphic',
    'sp-model',
    'sp-cms',
    'sp-auth',
    'sp-koa-views',
    'sp-response',
    'sp-upload',
    'sp-i18n'
]

// https://github.com/webpack/webpack/issues/2852
// webpack 在打包服务端依赖 node_modules 的时候易出错，
// 所以把 package.json 里描述的依赖过滤掉，只打包自己写的代码
// 注：在上线的时候需要需要自行安装 package.json 的依赖包
const filterExternalsModules = () => fs
    .readdirSync(path.resolve(__dirname, '../../', 'node_modules'))
    .concat(['react-dom/server'])
    .filter((x) => ['.bin'].concat(needBabelHandleList).indexOf(x) === -1)
    .filter((x) => !/^sp-/.test(x))
    .reduce((ext, mod) => {
        ext[mod] = ['commonjs', mod].join(' ') // eslint-disable-line no-param-reassign
        return ext
    }, {})

module.exports = {
    rules,
    plugins,
    resolve,
    needBabelHandleList,
    filterExternalsModules
}