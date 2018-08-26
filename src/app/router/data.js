import routeCheck from 'koot/React/route-check'

export default [
    {
        path: 'ships',
        name: 'ships',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/ship/list').default)
            }, 'ships')
        },
    },
    {
        path: 'ships/:id',
        name: 'shipDetails',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/ship/details').default)
            }, 'shipDetails')
        },
        childRoutes: [{
            path: ':tab'
        }],
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
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/equipment/list').default)
            }, 'equipments')
        }
    },
    {
        path: 'equipments/:id',
        name: 'equipmentDetails',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/equipment/details').default)
            }, 'equipmentDetails')
        },
        childRoutes: [{
            path: ':tab'
        }],
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
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/arsenal').default)
            }, 'arsenal')
        },
        childRoutes: [{
            path: ':day'
        }],
    },


    // ==================================================


    {
        path: 'entities',
        name: 'entities',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/entity/list').default)
            }, 'entities')
        }
    },
    {
        path: 'entities/:id',
        name: 'entityDetails',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/entity/details').default)
            }, 'entityDetails')
        }
    },


    // ==================================================


    {
        path: 'exillusts',
        name: 'exillusts',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/exillusts').default)
            }, 'exillusts')
        }
    },
]
