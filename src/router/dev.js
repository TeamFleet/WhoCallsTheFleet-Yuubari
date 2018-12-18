/* globals __DEV_COMPONENTS_ROUTES__:false */

import routeCheck from 'koot/React/route-check'

export default [
    {
        path: 'dev-ipsum',
        name: 'dev-ipsum',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/dev/LoremIpsum.jsx').default)
            }, 'DEV. Lorem-ipsum')
        }
    },
    {
        path: 'dev-components',
        name: 'dev-components',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/dev/components').default)
            }, 'DEV. Components')
        },
        indexRoute: {
            onEnter: (_, replace) => {
                replace(`/dev-components/${__DEV_COMPONENTS_ROUTES__[0].path}`)
            }
        },
        childRoutes: __DEV_COMPONENTS_ROUTES__.map(route => ({
            ...route,
            component: require(`@ui/pages/dev/components/${route.dirname}`).default
        }))
    },
    {
        path: 'dev-icons',
        name: 'dev-icons',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/dev/icons.jsx').default)
            }, 'DEV. Icons')
        }
    }
]
