import { routeCheck } from './'

export default [{
    path: 'ships',
    name: 'ships',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/ships').default)
        }, 'ships')
    }
}, {
    path: 'equipments',
    name: 'equipments',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/equipments').default)
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
            if (routeCheck(nextState)) cb(null, require('UI/pages/entities.jsx').default)
        }, 'entities')
    }
},


{
    path: 'ships/:id',
    name: 'thisShip',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/ship').default)
        }, 'thisShip')
    }
}
]