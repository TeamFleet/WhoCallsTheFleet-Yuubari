// webpack 基础配置
const config = require('./webpack/_base')

// 重写打包结果目录
config.outputPath = require('./webpack/output-path')

// 重写或配置客户端入口文件
config.clientApps = require('./webpack/client-apps')
config.clientEntries = require('./webpack/client-entries')

// 重写或配置服务端入口文件
config.serverEntries = require('./webpack/server-entries')

// 扩展 webpack 配置的 resolve 属性
config.resolve = require('./webpack/resolve')

// 重写 webpack 配置的 rules 属性
config.rules = require('./webpack/rules')
// 扩展 webpack 配置的 rules 属性
config.rulesExt = require('./webpack/rules-ext')

// 扩展 webpack 配置的 plugins 属性
config.plugins = require('./webpack/plugins')

// 扩展 webpack 入口执行流程
config.enterExt = require('./webpack/enter-ext')

module.exports = config