const path = require('path')

// 

const superBuild = require('./system/webpack/enter')

//

const dist = path.resolve('./dist-web/')

const config = async () => {
    // 描述环境
    // dev 开发 | dist 部署
    const ENV = process.env.WEBPACK_BUILD_ENV || 'dev'

    // 描述场景
    // client 客户端 | server 服务端
    const STAGE = process.env.WEBPACK_STAGE_MODE || 'client'

    if (STAGE === 'client' && ENV === 'dev') return await require('./config/apps/app/client-dev')
    if (STAGE === 'client' && ENV === 'dist') return await require('./config/apps/app/client-dist')

    if (STAGE === 'server' && ENV === 'dev') return await require('./config/apps/app/client-dev')
    if (STAGE === 'server' && ENV === 'dist') return await require('./config/apps/app/client-dist')

    return {}
}

const aliases = {

}

const beforeBuild = async () => { }
const afterBuild = async () => { }

superBuild({
    config,
    dist,
    aliases,
    beforeBuild,
    afterBuild,
})
