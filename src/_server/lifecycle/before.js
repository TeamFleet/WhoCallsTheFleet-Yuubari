const path = require('path')
const getDistPath = require('koot/utils/get-dist-path')

export default async (app) => {

    // 静态目录: 图片资源
    {
        const Koa = require('koa')
        const mount = require('koa-mount')
        const koaStatic = require('koa-static')
        const staticPicsServer = new Koa()
        const dirPics = (() => {
            if (process.env.WEBPACK_BUILD_ENV === 'dev')
                return path.resolve(process.cwd(), 'pics')
            return path.resolve(getDistPath(), 'pics')
        })()
        staticPicsServer.use(koaStatic(dirPics, {
            maxage: 30 * 24 * 60 * 60 * 1000,
            hidden: false,
            defer: false,
            gzip: true,
            extensions: false
        }))
        app.use(mount(`/pics`, staticPicsServer))
    }
}
