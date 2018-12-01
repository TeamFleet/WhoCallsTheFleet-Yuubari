import routeCheck from 'koot/React/route-check'

export default [
    {
        path: 'ships',
        name: 'ships',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/ship/list').default)
            }, 'Ship List')
        },
    },
    {
        path: 'ships/:id',
        name: 'shipDetails',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/ship/details').default)
            }, 'Ship Details')
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
            }, 'Equipments')
        }
    },
    {
        path: 'equipments/:id',
        name: 'equipmentDetails',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/equipment/details').default)
            }, 'Equipment Details')
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
            }, 'Arsenal')
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
            }, 'People')
        }
    },
    {
        path: 'entities/:id',
        name: 'entityDetails',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/entity/details').default)
            }, 'People Details')
        }
    },


    // ==================================================


    {
        path: 'exillusts',
        name: 'exillusts',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/exillusts').default)
            }, 'Ex-CGs')
        }
    },
]
