const router = require('koa-router')()

router
    .get('/server-custom', async(ctx) => {
        return ctx.render('custom')
    })
    .get('*', async(ctx) => {
        return ctx.render('404');
    })

export default router