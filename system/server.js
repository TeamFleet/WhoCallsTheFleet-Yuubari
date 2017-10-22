/* 
    此文件不建议修改，方便升级
*/

import { AppContainer } from 'super-project/AppContainer'

const serverConfig = require('../config/system')
const server = new AppContainer()

/* 公用的koa配置 */

server.app.keys = serverConfig.COOKIE_KEYS

/* 公用koa中间件 */

require('./middleware')(server)

/* 挂载子应用 */
;(async(server) => {
    const appsConfig = await require('../config/apps')
    for (let appName in appsConfig) {
        let config = appsConfig[appName]
        server.addSubApp(config.domain, config.server) // 、、、、、、、、、、、因为是异步的，server内容可能不全！！！
    }
})(server)

// const appsConfig = require('../config/apps')
// for (let appName in appsConfig) {
//     let config = appsConfig[appName]
//     console.log(config)
//     server.addSubApp(config.domain, require('../apps/api/index')) 
// }

server.mountSwitchSubAppMiddleware()

/* 系统运行 */

server.run(serverConfig.SERVER_PORT)