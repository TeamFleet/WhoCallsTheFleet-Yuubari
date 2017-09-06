import Root from '@appUI/app.jsx'

import tools from './tools.js'
import data from './data.js'
import dev from './dev.js'

export const routeCheck = (nextState) => (__SERVER__ || __SPA__) ? true : (nextState.location.pathname === location.pathname)

export default {
    path: __SPA__ ? '/' : '',
    component: Root,
    name: 'page-app',
    childRoutes: [
        {
            path: 'home',
            name: 'home',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    if (routeCheck(nextState)) cb(null, require('@appUI/pages/home').default)
                }, 'home')
            },
            isIndex: true
        },

        ...tools,
        ...data,

        {
            path: 'about',
            name: 'about',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    if (routeCheck(nextState)) cb(null, require('@appUI/pages/about').default)
                }, 'about')
            }
        },

        ...dev
    ]
}