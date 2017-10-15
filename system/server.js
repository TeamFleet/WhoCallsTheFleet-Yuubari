/* 
    此文件不建议修改，方便升级
*/

import { AppContainer } from 'super-project/AppContainer'

const serverConfig = require('../config/server')
const server = new AppContainer()

/* 公用的koa配置 */

server.app.keys = serverConfig.COOKIE_KEYS

/* 公用koa中间件 */

require('./middleware')(server)

/* 挂载子应用 */

require('../config/install').forEach((item) => {
    server.addSubApp(item.domain, item.app)
})
server.mountSwitchSubAppMiddleware()

/* 系统运行 */
server.run(serverConfig.SERVER_PORT)