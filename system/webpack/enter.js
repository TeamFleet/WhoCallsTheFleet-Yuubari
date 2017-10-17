const fs = require('fs-extra')
// const argv = require('yargs').argv
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

// 自定义配置/扩展
const customConfig = require('../../config/webpack')

// 客户端开发环境webpack-dev-server端口号
const CLIENT_DEV_PORT = process.env.WEBPACK_DEV_SERVER_PORT

// 描述环境
// dev 开发， dist 部署
const env = process.env.WEBPACK_BUILD_ENV || 'dev'

// 描述场景
// client 客户端， server 服务端
const stage = process.env.WEBPACK_STAGE_MODE || 'client'

// 程序启动路径，作为查找文件的基础
const appRunPath = process.cwd()

// 生产标准配置文件格式
const factoryConfig = (config) => {

    const defaultConfigStruct = {
        client: {
            dev: {},
            dist: {}
        },
        server: {
            dev: {},
            dist: {}
        }
    }

    // 生产配置
    Object.assign(config, defaultConfigStruct)

    return config
}

// 扩展配置
// 配置有可能是 Array
const parseConfig = (config, defaults) => {
    if (Array.isArray(config))
        return config.map(thisConfig => parseConfig(thisConfig, defaults))

    // try to fix a pm2 bug that will currupt [name] value
    if (config.output) {
        for (let key in config.output) {
            config.output[key] = config.output[key].replace(/-_-_-_-_-_-(.+?)-_-_-_-_-_-/g, '[name]')
        }
    }

    // console.log(config.entry)
    return Object.assign({}, defaults, config)
}

const run = async (defaults = {}) => {
    // 标准化配置
    defaults = factoryConfig(defaults)
    const webpackConfig = fs.existsSync(`./${stage}/${env}`)
        ? parseConfig(
            await require(`./${stage}/${env}`)(appRunPath, CLIENT_DEV_PORT),
            defaults[stage][env]
        )
        : defaults[stage][env]

    // console.log('webpackConfig', webpackConfig)

    // 客户端开发模式
    if (stage === 'client' && env === 'dev') {
        const compiler = webpack(webpackConfig)

        // more config
        // http://webpack.github.io/docs/webpack-dev-server.html
        const server = new WebpackDevServer(compiler, {
            quiet: false,
            stats: { colors: true },
            hot: true,
            inline: true,
            contentBase: './',
            publicPath: '/dist/',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        server.listen(CLIENT_DEV_PORT)
    }

    // 客户端打包
    if (stage === 'client' && env === 'dist') {
        process.env.NODE_ENV = 'production'

        const compiler = webpack(webpackConfig)
        compiler.run((err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        })
    }

    // 客户端打包: SPA
    if (stage === 'client' && env === 'spa') {
        process.env.NODE_ENV = 'production'

        const compiler = webpack(webpackConfig)
        compiler.run((err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        })
    }

    // 服务端开发环境
    if (stage === 'server' && env === 'dev') {
        webpack(webpackConfig, (err, stats) => {
            if (err) console.log(`webpack dev error: ${err}`)

            console.log(stats.toString({
                chunks: false,
                colors: true
            }))
        })
    }

    // 服务端打包
    if (stage === 'server' && env === 'dist') {
        process.env.NODE_ENV = 'production'

        webpack(webpackConfig, (err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        })
    }

    // 扩展流程
    if (typeof customConfig.enterExt === 'function')
        await customConfig.enterExt(defaults)

}

run()