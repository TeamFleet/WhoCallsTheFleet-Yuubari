import { app, run } from 'sp-base/server'
import { router as reactRouter, createConfigureStore } from '../client'
import { template } from '../html'
import mountMiddlewares from './middlewares'
import isomorphic, { getInjectionJsFilename } from 'sp-react-isomorphic'
import is from 'is_js'
import { localeId as currentLocaleId } from 'sp-i18n'


// 项目配置 -----------------------------------------------------------------------

// 打包结果目标目录
const distPathName = 'dist-web'

// 同构配置
const isomorphicOptions = {
    // react-router 配置对象
    routes: reactRouter.get(),

    // redux store 对象
    configStore: createConfigureStore(),

    // HTML基础模板
    template: template,

    // 打包结果目标目录，如果为空默认为 /dist
    distPathName: distPathName,

    // 对HTML基础模板的自定义注入
    injection: {
        // js: (args) => `<script src="${args.path}/client.js"></script>`,
        manifest: () => `<link rel="manifest" href="/manifest-${currentLocaleId}.json">`,
        critical: (args) => `<script src="${args.path}/${getInjectionJsFilename('critical', args.distPathName)}"></script>`,
        critical_extra_old_ie_filename: (args) => `<script>var __CRITICAL_EXTRA_OLD_IE_FILENAME__ = "${args.path}/${getInjectionJsFilename('critical-extra-old-ie', args.distPathName)}"</script>`
    }
}

// 项目配置 - 结束 ------------------------------------------------------------------


// 挂载中间件
mountMiddlewares(app, { isomorphicOptions })

// cookie key
app.keys = ['super-project-app']

// 判断域名
app.use(async function subApp(ctx, next) {
    ctx.state.subapp = ctx.hostname.split('.')[0]

    // 开发模式可以把以IP访问，默认指向www
    if (__DEV__ && (is.number(ctx.state.subapp * 1) || ctx.hostname === 'localhost'))
        ctx.state.subapp = 'www'

    await next()
});

// 对接响应的子app处理逻辑
app.use(async function composeSubapp(ctx) {

    const compose = require('koa-compose')
    let app = null
    switch (ctx.state.subapp) {
        // 静态资源站点，线上可以用cdn代替
        case 'static':
            app = require('./app-static')
            await compose(app.middleware)(ctx)
            break
        // 一般类型接口服务
        case 'api':
            app = require('./app-api')
            await compose(app.middleware)(ctx)
            break
        // 一般类型网站
        case '127':
        case 'www':
        case 'super':
            app = require('./app-www')
            app.use(isomorphic(isomorphicOptions))
            await compose(app.middleware)(ctx)
            break
        // 默认跳转到网站
        default:
            ctx.redirect(ctx.protocol + '://' + 'www.' + ctx.host + ctx.path + ctx.search)
            break
    }
});


// - TODO:挂载features 
// serviceMount(proxyRootRouter, app)


// 启动端口
const argv = require('yargs').argv
const port = (() => {
    let port = '3000'
    if (argv.sport) port = argv.sport
    if (process.env.SPORT) port = process.env.SPORT
    return port
})()

run(port)