"use strict"

const path = require('path')

let config = require('./_base.js')({
    distPath: path.resolve(process.cwd(), 'app/dist/'),
    publicPath: '/!/app/dist/',
    target: 'web',
    babel: {
        presets: {
            env: {
                targets: {
                    chrome: 41
                },
                modules: false
            }
        }
    },
    plugins: []
})

module.exports = config