// 处理 es6\es7
require('babel-core/register')
require('babel-polyfill')

// 加载全局变量
require('./global')

// babel 处理入口文件
require('./server')
