/*
ares: "1.10.0-DEV"
chromium: "41.0.2272.76"
http_parser: "2.3.0"
modules: "43"
node: "1.2.0"
node-webkit: "0.12.2"
nw-commit-id: "caedb6a-296de67-be948af-459755a-2bdc251-1764a45"
openssl: "1.0.1k"
uv: "1.4.0"
v8: "3.32.7"
zlib: "1.2.5"
 */

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
                    node: 1.2
                },
                modules: false
            }
        }
    },
    browserList: [
        'Chrome >= 41'
    ],
    plugins: []
})

module.exports = config