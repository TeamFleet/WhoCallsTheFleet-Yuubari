import Root from '@ui/app.jsx'

import tools from './tools.js'
import operations from './operations'
import data from './data.js'
import dev from './dev.js'

// 检查当前URL与路由配置路径是否相匹配，如果否，则不予渲染组件
// 通常在网络连接情况较差的情况下，容易出现不匹配的情况
import routeCheck from 'super-project/React/route-check'
// export const routeCheck = (nextState) => _routeCheck(nextState, __SERVER__ || __SPA__)

export default {
    path: __SPA__ ? '/' : '',
    component: Root,
    name: 'page-app',

    indexRoute: {
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/home').default)
            }, 'home')
        }
    },

    childRoutes: [
        // {
        //     path: 'home',
        //     name: 'home',
        //     getComponent: (nextState, cb) => {
        //         require.ensure([], (require) => {
        //             if (routeCheck(nextState)) cb(null, require('@ui/pages/home').default)
        //         }, 'home')
        //     },
        //     isIndex: true
        // },

        ...tools,
        ...operations,
        ...data,

        {
            path: 'about',
            name: 'about',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    if (routeCheck(nextState)) cb(null, require('@ui/pages/about').default)
                }, 'about')
            }
        },

        ...dev
    ]
}
