"use strict"

const path = require('path')

let config = require('./_base.js')({
    distPath: path.resolve(process.cwd(), 'app/dist/'),
    publicPath: 'dist/',
    target: 'node-webkit',
    babel: {
        presets: {
            env: {
                targets: {
                    chrome: 41,
                    edge: 12,
                    firefox: 20,
                    ie: 11,
                    ios: 5,
                    android: 2
                },
                modules: false
            }
        }
    },
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
    plugins: []
})

module.exports = config