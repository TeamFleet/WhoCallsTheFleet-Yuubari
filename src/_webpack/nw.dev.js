/*
ares: "1.10.1-DEV"
chromium: "55.0.2883.87"
http_parser: "2.7.0"
modules: "51"
node: "7.3.0"
node-webkit: "0.19.3"
nw: "0.19.3"
nw-commit-id: "ee988a6-8643404-287bf0e-c24e9c9"
openssl: "1.0.2j"
uv: "1.10.1"
v8: "5.5.372.32"
zlib: "1.2.8"
 */

"use strict"

const path = require('path')

let config = require('./_base.js')({
    distPath: path.resolve(process.cwd(), 'app/dist/'),
    publicPath: 'dist/',
    target: 'node-webkit',
    browserList: [
        'Chrome >= 55'
    ],
    node: 7.3
})

config.entry.critical.unshift(path.resolve(process.cwd(), 'node_modules/nw-dev/lib/dev.js'))
config.entry.critical.unshift(path.resolve(process.cwd(), 'src/_core/dev.js'))

console.log(config)

module.exports = config
