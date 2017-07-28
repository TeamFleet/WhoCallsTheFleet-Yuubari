import {routeCheck} from './'

export default [{
    path: 'fleets',
    name: 'fleets',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/fleets.jsx').default)
        }, 'fleets')
    }
}, {
    path: 'calctp',
    name: 'calctp',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/calctp').default)
        }, 'calctp')
    }
}]