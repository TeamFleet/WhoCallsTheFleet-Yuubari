import { routeCheck } from './'

export default [{
    path: 'ships',
    name: 'ships',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/ship/list').default)
        }, 'ships')
    }
}, {
    path: 'equipments',
    name: 'equipments',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/equipment/list').default)
        }, 'equipments')
    }
}, {
    path: 'arsenal',
    name: 'arsenal',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/arsenal').default)
        }, 'arsenal')
    }
}, {
    path: 'entities',
    name: 'entities',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/entity-list.jsx').default)
        }, 'entities')
    }
},


{
    path: 'ships/:id',
    name: 'thisShip',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/ship/details').default)
        }, 'thisShip')
    },
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
                    if (routeCheck(nextState)) cb(null, require('@appUI/pages/ship/details/infos').default)
                })
            },
            isIndex: true
        }, {
            path: ':tab',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    if (routeCheck(nextState)) cb(null, require('@appUI/pages/ship/details/' + nextState.params.tab).default)
                })
            }
        }
    ]
}, {
    path: 'equipments/:id',
    name: 'thisEquipment',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/equipment/details').default)
        }, 'thisEquipment')
    },
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
                    if (routeCheck(nextState)) cb(null, require('@appUI/pages/equipment/details/infos').default)
                })
            },
            isIndex: true
        }, {
            path: ':tab',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    if (routeCheck(nextState)) cb(null, require('@appUI/pages/equipment/details/' + nextState.params.tab).default)
                })
            }
        }
    ]
}, {
    path: 'entities/:id',
    name: 'thisEntity',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/entity/details').default)
        }, 'thisEntity')
    }
}
]