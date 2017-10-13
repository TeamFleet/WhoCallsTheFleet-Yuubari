// 扩展 webpack 配置的 rules 属性

const path = require('path')
const appPath = process.cwd()

module.exports = [{
    test: /\.md$/,
    include: [
        path.resolve(appPath, './apps/app/docs')
    ],
    loader: 'raw-loader'
}]