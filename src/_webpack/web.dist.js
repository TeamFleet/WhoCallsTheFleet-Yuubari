"use strict"

const path = require('path')

let config = require('./_base.js')({
    distPath: path.resolve(process.cwd(), 'app/dist/'),
    publicPath: 'dist/',
    target: 'web',
    browserList: [
        'Chrome >= 20',
        'Edge >= 12',
        'Firefox >= 20',
        'ie >= 11',
        'iOS >= 5',
        'Android >= 2',
        'ChromeAndroid >= 20',
        'ExplorerMobile >= 11'
    ],
    node: false,
    plugins: []
})

module.exports = config