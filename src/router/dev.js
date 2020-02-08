/* globals __DEV_COMPONENTS_ROUTES__:false */

import routeCheck from 'koot/React/route-check';

export default [
    {
        path: 'dev-ipsum',
        name: 'dev-ipsum',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "DEV. Lorem-ipsum" */
                '@ui/pages/dev/LoremIpsum.jsx'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'dev-components',
        name: 'dev-components',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "DEV. Components" */
                '@ui/pages/dev/components'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        },
        indexRoute: {
            onEnter: (_, replace) => {
                replace(`/dev-components/${__DEV_COMPONENTS_ROUTES__[0].path}`);
            }
        },
        childRoutes: __DEV_COMPONENTS_ROUTES__.map(route => ({
            ...route,
            component: require(`@ui/pages/dev/components/${route.dirname}`)
                .default
        }))
    },
    {
        path: 'dev-icons',
        name: 'dev-icons',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "DEV. Icons" */
                '@ui/pages/dev/icons.jsx'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    }
];
