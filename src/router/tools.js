import routeCheck from 'koot/React/route-check';

export default [
    {
        path: 'fleets',
        name: 'fleets',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Fleet Builder Entry Page" */
                '@ui/pages/fleets-indev'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'fleets/:id.:build',
        name: '舰队模拟配置',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Fleet Builder Fleet Details Page" */
                '@ui/pages/fleets/details'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'fleets-wip',
        name: '舰队模拟',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Fleet Builder WIP Blank Page" */
                '@ui/pages/fleets'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'calctp',
        name: 'calctp',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "TP Calculator Single-Page-Tool" */
                '@ui/pages/calctp'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'academy',
        name: 'academy',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Academy Entry Page" */
                '@ui/pages/academy'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    }
    // {
    //     path: 'sets',
    //     name: 'sets',
    //     getComponent: (nextState, cb) => {
    //         require.ensure([], (require) => {
    //             if (routeCheck(nextState)) cb(null, require('@ui/pages/sets').default)
    //         }, 'sets')
    //     }
    // },

    // redirects
    // {
    //     path: 'calctp',
    //     name: 'calctp',
    //     isRedirect: true,
    //     onEnter: ({ params }, replace) => replace(`/calculators/calctp`)
    // }
];
