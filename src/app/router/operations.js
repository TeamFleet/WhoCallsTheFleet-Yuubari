import routeCheck from 'koot/React/route-check'

export default [{
    path: 'sorties',
    name: 'sorties',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@ui/pages/sorties').default)
        }, 'sorties')
    }
}, {
    path: 'expeditions',
    name: 'expeditions',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@ui/pages/expeditions').default)
        }, 'expeditions')
    }
}]
