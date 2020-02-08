import routeCheck from 'koot/React/route-check';

export default [
    {
        path: 'ships',
        name: 'ships',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Ship List Page" */
                '@ui/pages/ship/list'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'ships/:id',
        name: 'shipDetails',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Ship Details Page" */
                '@ui/pages/ship/details'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        },
        childRoutes: [
            {
                path: ':tab'
            }
        ]
        /*
            childRoutes: __CLIENT__ ? [
                {
                    path: ':tab'
                }
            ] : [
                {
                    path: 'infos',
                    name: 'infos',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            if (routeCheck(nextState)) cb(null, require('@ui/pages/ship/details/infos').default)
                        }, 'thisShip-infos')
                    },
                    isIndex: true
                }, {
                    path: ':tab',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            if (routeCheck(nextState)) cb(null, require('@ui/pages/ship/details/' + nextState.params.tab).default)
                        })
                    }
                }
            ]
        */
    },

    // ==================================================

    {
        path: 'equipments',
        name: 'equipments',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Equipment List Page" */
                '@ui/pages/equipment/list'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'equipments/:id',
        name: 'equipmentDetails',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Equipment Details Page" */
                '@ui/pages/equipment/details'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        },
        childRoutes: [
            {
                path: ':tab'
            }
        ]
        /*
            childRoutes: __CLIENT__ ? [
                {
                    path: ':tab'
                }
            ] : [{
                path: 'infos',
                name: 'infos',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        if (routeCheck(nextState)) cb(null, require('@ui/pages/equipment/details/infos').default)
                    })
                },
                isIndex: true
            }, {
                path: ':tab',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        if (routeCheck(nextState)) cb(null, require('@ui/pages/equipment/details/' + nextState.params.tab).default)
                    })
                }
            }]
        */
    },

    // ==================================================

    {
        path: 'arsenal',
        name: 'arsenal',
        childRoutesNest: 1,
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Arsenal Page" */
                '@ui/pages/arsenal'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        },
        childRoutes: [
            {
                path: ':day'
            }
        ]
    },

    // ==================================================

    {
        path: 'entities',
        name: 'entities',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "People List Page" */
                '@ui/pages/entity/list'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'entities/:id',
        name: 'entityDetails',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "People Details Page" */
                '@ui/pages/entity/details'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },

    // ==================================================

    {
        path: 'excgs',
        name: 'excgs',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Extra CGs Page" */
                '@ui/pages/excgs'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    }
];
