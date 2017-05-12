import Root from 'UI/app.jsx'

import tools from './tools.js'
import data from './data.js'

export const routeCheck = (nextState) => __SERVER__ ? true : (nextState.location.pathname === location.pathname)

export default {
    path: '',
    component: Root,
    name: 'page-app',
    childRoutes: [
        {
            path: 'home',
            name: 'home',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    if (routeCheck(nextState)) cb(null, require('UI/pages/home').default)
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
                    if (routeCheck(nextState)) cb(null, require('UI/pages/about').default)
                }, 'about')
            }
        }
    ]
}