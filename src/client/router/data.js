import { routeCheck } from './'

export default [{
    path: 'ships',
    name: 'ships',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/ship/list').default)
        }, 'ships')
    }
}, {
    path: 'equipments',
    name: 'equipments',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/equipment/list').default)
        }, 'equipments')
    }
}, {
    path: 'arsenal',
    name: 'arsenal',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/arsenal').default)
        }, 'arsenal')
    }
}, {
    path: 'entities',
    name: 'entities',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/entity-list.jsx').default)
        }, 'entities')
    }
},


{
    path: 'ships/:id',
    name: 'thisShip',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/ship/details').default)
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
                    if (routeCheck(nextState)) cb(null, require('UI/pages/ship/details/infos').default)
                })
            },
            isIndex: true
        }, {
            path: ':tab',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    if (routeCheck(nextState)) cb(null, require('UI/pages/ship/details/' + nextState.params.tab).default)
                })
            }
        }
    ]
}, {
    path: 'equipments/:id',
    name: 'thisEquipment',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/equipment/details').default)
        }, 'thisEquipment')
    }
}
]