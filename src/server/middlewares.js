import responseTime from 'koa-response-time'
import body from 'koa-body'

const convert = require('koa-convert')

export default function mountMiddlewares(app, opt) {


    // ---------------------------------------------------------------------------------------------------

    // 响应时间 
    app.use(responseTime())

    // ---------------------------------------------------------------------------------------------------

    // helmet 安全
    const helmet = require('koa-helmet')
    app.use(helmet())

    // ---------------------------------------------------------------------------------------------------

    // 请求信息
    if (__DEV__) {
        const debug = require('debug')('http')
        app.use(async(ctx, next) => {
            debug(ctx.method + ' ' + ctx.url)
            await next()
        })
    }

    // ---------------------------------------------------------------------------------------------------

    // gzip
    const compress = require('koa-compress')
    app.use(compress({}))

    // ---------------------------------------------------------------------------------------------------

    // 压缩html
    const htmlMinify = require('koa-html-minifier')({
        collapseWhitespace: true
    })
    app.use(convert(htmlMinify))

    // ---------------------------------------------------------------------------------------------------

    // ejs 模板引擎
    const views = require('sp-koa-views')
    app.use(views(__dirname + '/views', {
        extension: 'ejs'
    }))

    // ---------------------------------------------------------------------------------------------------

    // 静态文件服务（TODO:后续可优化使用Nginx代理）
    const koaStatic = require('koa-static')
    app.use(convert(koaStatic(process.cwd() + '/' + opt.isomorphicOptions.distPathName + '/public')))

    // ---------------------------------------------------------------------------------------------------

    // ctx.request.body
    app.use(body())





    // koa-router 路由扩展（方便sp-auth的acl[access control list]使用）
    // - 创建代理root路由，目的是把所有子路由挂载到同一个路由对象上
    // - 挂载自定义路由
    // const serverRootRouter = new Router()
    // const proxyRootRouter = {
    //     use: (subRouter) => {
    //         serverRootRouter.use('', subRouter.routes(), subRouter.allowedMethods())
    //     },
    //     root: serverRootRouter
    // }
    // proxyRootRouter.use(serverCustomRouter)
    // app.use(serverRootRouter)

}