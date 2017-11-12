const webpack = require('webpack')
const common = require('../common')

const factoryConfig = async(opt) => {

    let { RUN_PATH, CLIENT_DEV_PORT, APP_KEY } = opt

    let config = {
        target: 'web',
        devtool: 'source-map',
        output: {
            // -_-_-_-_-_- is trying to fix a pm2 bug that will currupt [name] value
            // check enter.js for the fix
            filename: `${APP_KEY}.-_-_-_-_-_-[name]-_-_-_-_-_-.js`,
            chunkFilename: `${APP_KEY}.chunk.-_-_-_-_-_-[name]-_-_-_-_-_-.js`,
            path: '/',
            publicPath: `http://localhost:${CLIENT_DEV_PORT}/dist/`,
            crossOriginLoading: 'anonymous',
        },
        module: {
            rules: [...common.rules]
        },
        plugins: [
            // 在node执行环境中设置，不起作用，此处不能省略
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        resolve: common.resolve
    }

    return config
}

module.exports = async(opt) => await factoryConfig(opt)