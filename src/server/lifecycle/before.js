const path = require('path')
const getDistPath = require('koot/utils/get-dist-path')

import { init as dbInit } from '@api/database'

export default async (app) => {

    // 初始化 database
    await dbInit()

    // 静态目录: 图片资源
    {
        const Koa = require('koa')
        const mount = require('koa-mount')
        const koaStatic = require('koa-static')
        const staticPicsServer = new Koa()
        staticPicsServer.use(koaStatic(
            path.resolve(getDistPath(), './pics'),
            {
                maxage: 30 * 24 * 60 * 60 * 1000,
                hidden: false,
                defer: false,
                gzip: true,
                extensions: false
            }
        ))
        app.use(mount(`/pics`, staticPicsServer))
    }
}
