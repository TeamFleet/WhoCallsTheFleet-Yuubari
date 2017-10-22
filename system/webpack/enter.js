//
const fs = require('fs-extra')
const path = require('path')

//
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebpackConfig = require('webpack-config').default
const common = require('./common')

// 调试webpack模式
const DEBUG = true

// 程序启动路径，作为查找文件的基础
const RUN_PATH = process.cwd()

// 客户端开发环境webpack-dev-server端口号
const CLIENT_DEV_PORT = process.env.WEBPACK_DEV_SERVER_PORT || 3001

// 描述环境
// dev 开发 | dist 部署
const ENV = process.env.WEBPACK_BUILD_ENV || 'dev'

// 描述场景
// client 客户端 | server 服务端
const STAGE = process.env.WEBPACK_STAGE_MODE || 'client'

/**
 * 修复配置
 * 配置有可能是 Array
 * 
 * @param {any} config webpack的配置对象
 * @returns 修复后的配置对象
 */
function makeItButter(config) {

    // 数组情况，拆分每项分别处理
    if (Array.isArray(config))
        return config.map(thisConfig => makeItButter(thisConfig))

    // try to fix a pm2 bug that will currupt [name] value
    if (config.output) {
        for (let key in config.output) {
            config.output[key] = config.output[key].replace(/-_-_-_-_-_-(.+?)-_-_-_-_-_-/g, '[name]')
        }
    }

    // remove all undefined from plugins
    if (Array.isArray(config.plugins)) {
        config.plugins = config.plugins.filter(plugin => typeof plugin !== 'undefined')
    }

    // remove duplicate plugins
    // if (Array.isArray(config.plugins)) {
    //     config.plugins = removeDuplicateObject(config.plugins)
    // }

    // remove duplicate rules
    if (Array.isArray(config.module.rules)) {
        config.module.rules = removeDuplicateObject(config.module.rules)
    }


    // 删除重复对象
    function removeDuplicateObject(list) {
        let map = {}
        list = (() => {
            return list.map((rule) => {
                let key = JSON.stringify(rule)
                key = key.toLowerCase().replace(/ /g, '')
                if (map[key])
                    rule = undefined
                else
                    map[key] = 1
                return rule
            })
        })()
        return list.filter(rule => rule != undefined)
    }

    // custom logic use
    delete config.__ext
    delete config.spa
    delete config.htmlPath

    // no ref obj
    return Object.assign({}, config)
}

/**
 * 根据应用配置生产出一个默认webpack配置
 * 
 * @param {any} opt 应用配置
 * @param {any} _path 读取默认配置文件地址，非必须
 * @returns 
 */
async function createDefaultConfig(opt, _path) {

    // 根据当前环境变量，定位对应的默认配置文件
    _path = _path || path.resolve(RUN_PATH, `./system/webpack/${STAGE}/${ENV}.js`)

    const factory = await getConfigFactory(_path)
    const config = await factory(opt)

    return config
}

/**
 * 根据应用配置生产出一个默认webpack配置[客户端情况的SPA模式使用]
 * 
 * @param {any} opt 
 * @returns 
 */
async function createSPADefaultConfig(opt) {
    return createDefaultConfig(opt, path.resolve(RUN_PATH, `./system/webpack/${STAGE}/${ENV}.spa.js`))
}

/**
 * 获取配置生成的工厂方法
 * 
 * @param {any} path 工厂方法对应的文件路径
 * @returns 工厂方法
 */
async function getConfigFactory(path) {

    let factory

    if (fs.existsSync(path))
        factory = await require(path)
    else
        console.log(`!!! ERROR !!!  没找到对应的配置文件: ${path}`)

    return factory
}

/**
 * Webpack 运行入口方法
 */
async function justDoooooooooooooIt() {

    // webpack 执行用的配置对象
    let webpackConfigs = []

    DEBUG && console.log('============== Webpack Debug =============')
    DEBUG && console.log('Webpack 打包环境：', STAGE, ENV)

    /**
     * 处理客户端配置文件
     * [n个应用] x [m个打包配置] = [webpack打包配置集合]
     */
    async function handlerClientConfig() {

        // 把装载的所有子应用的 webpack 配置都加上
        const appsConfig = await require('../../config/apps')

        for (let appName in appsConfig) {

            let opt = { RUN_PATH, CLIENT_DEV_PORT, APP_KEY: appName }
            let defaultConfig = await createDefaultConfig(opt)
            let defaultSPAConfig = await createSPADefaultConfig(opt)

            let appConfig = appsConfig[appName]

            // 如果没有webpack配置，则表示没有react，不需要打包
            if (!appConfig.webpack) continue

            let clientConfigs = appConfig.webpack.client

            // 统一转成数组，支持多个client配置
            if (!Array.isArray(clientConfigs)) {
                clientConfigs = [clientConfigs]
            }

            clientConfigs.forEach((clientConfig) => {

                let config = new WebpackConfig()
                clientConfig = new WebpackConfig().merge(clientConfig)

                // 跟进打包环境和用户自定义配置，扩展webpack配置
                if (clientConfig.__ext) {
                    clientConfig.merge(clientConfig.__ext[ENV])
                }

                let _defaultConfig = (() => {

                    let config = Object.assign({}, defaultConfig)

                    // 如果是SPA应用
                    if (clientConfig.spa) {
                        config = Object.assign({}, defaultSPAConfig)
                    }
                    return config
                })()

                // 如果自定义了，则清除默认
                if (clientConfig.entry) _defaultConfig.entry = undefined
                if (clientConfig.output) _defaultConfig.output = undefined

                //
                // 如果自定义了plugins，则分析并实例化plugins内容
                // 
                if (clientConfig.plugins) {

                    const pluginMap = {}

                    // 默认plugins
                    pluginMap['default'] = _defaultConfig.plugins
                    _defaultConfig.plugins = undefined

                    // 补充必须的打包环境变量
                    pluginMap['global'] = common.plugins(ENV, STAGE, clientConfig.spa)

                    // sp扩展的plugins
                    pluginMap['pwd'] = common.factoryPWAPlugin({ appName: appName, outputPath: '' })


                    // 字符串且等于default，使用默认plugins
                    // =>
                    if (clientConfig.plugins == 'default') {

                        clientConfig.plugins = pluginMap['global'].concat(pluginMap['default'])
                    } else

                    // 需要解析的plugins
                    // =>
                    if (Array.isArray(clientConfig.plugins)) {

                        let _plist = []

                        _plist = _plist.concat(pluginMap['global'])

                        clientConfig.plugins.forEach((item) => {

                            // 默认plugin列表
                            if (item == 'default') {
                                _plist = _plist.concat(pluginMap['default'])
                            }

                            // 自定义plugin列表
                            if (Array.isArray(item)) {
                                _plist = _plist.concat(item)
                            }

                            // sp的自定义plugin列表，key是名字，val是配置项
                            if (typeof item == 'object') {

                                // sp的PWA配置
                                if (item['pwa']) {
                                    let autoConfig = { appName: appName, outputPath: path.resolve(clientConfig.output.path, '../') }
                                    let opt = Object.assign({}, autoConfig, item['pwa'])
                                    _plist.push(common.factoryPWAPlugin(opt))
                                }

                                // 
                                // .... 这里可以继续写sp自己的扩展plugin
                                // 
                            }
                        })

                        // 把解析好的plugin列表反赋值给客户端配置
                        clientConfig.plugins = _plist
                    }

                    // =>
                    else {
                        new Error('plugins 配置内容有错误，必须是 array | [default]')
                    }
                }

                config
                    .merge(makeItButter(_defaultConfig))
                    .merge(makeItButter(clientConfig))

                webpackConfigs.push(config)
            })
        }
    }

    /**
     * 处理服务端配置文件
     * [n个应用] 公用1个服务端打包配置，并且merge了client的相关配置
     * 注：如果客户端的配置有特殊要求或者冲突，则需要手动调整下面的代码
     */
    async function handlerServerConfig() {

        // 服务端需要全部子项目的配置集合
        // 先合并全部子项目的配置内容
        // 再合并到服务端配置里

        const appsConfig = await require('../../config/apps')
        let tempClientConfig = new WebpackConfig()

        for (let appName in appsConfig) {

            // 如果没有webpack配置，则表示没有react，不需要打包
            if (!appsConfig[appName].webpack) continue

            let clientConfig = appsConfig[appName].webpack.client

            if (!Array.isArray(clientConfig))
                clientConfig = [clientConfig]

            clientConfig.forEach((config) => tempClientConfig.merge(config))
        }

        let opt = { RUN_PATH, CLIENT_DEV_PORT }
        let defaultConfig = await createDefaultConfig(opt)
        let config = new WebpackConfig()

        // 注:在某些项目里，可能会出现下面的加载顺序有特定的区别，需要自行加判断
        //    利用每个app的配置，设置 include\exclude 等。

        config
            .merge(defaultConfig)
            .merge({
                module: tempClientConfig.module,
                resolve: tempClientConfig.resolve,
                plugins: common.plugins(ENV, STAGE)
            })

        // config.module.rules.forEach((item) => console.log(JSON.stringify(item)))

        webpackConfigs.push(config)
    }

    // 客户端开发模式
    if (STAGE === 'client' && ENV === 'dev') {

        await handlerClientConfig()

        const compiler = webpack(makeItButter(webpackConfigs))

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
    if (STAGE === 'client' && ENV === 'dist') {

        process.env.NODE_ENV = 'production'

        await handlerClientConfig()

        // 执行打包
        const compiler = webpack(makeItButter(webpackConfigs))

        compiler.run((err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // 输出精简内容
                colors: true
            }))
        })

    }

    // 服务端开发环境
    if (STAGE === 'server' && ENV === 'dev') {

        await handlerServerConfig()

        webpack(makeItButter(webpackConfigs), (err, stats) => {
            if (err) console.log(`webpack dev error: ${err}`)

            console.log(stats.toString({
                chunks: false,
                colors: true
            }))
        })
    }

    // 服务端打包
    if (STAGE === 'server' && ENV === 'dist') {

        process.env.NODE_ENV = 'production'

        await handlerServerConfig()

        webpack(makeItButter(webpackConfigs), (err, stats) => {
            if (err) console.log(`webpack dist error: ${err}`)

            console.log(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        })
    }

    DEBUG && console.log('执行配置：')
    DEBUG && console.log('-----------------------------------------')
    DEBUG && console.log(webpackConfigs)
    DEBUG && console.log('============== Webpack Debug End =============')
}

justDoooooooooooooIt()