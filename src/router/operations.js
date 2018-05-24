import routeCheck from 'super-project/React/route-check'

export default [{
    path: 'sorties',
    name: 'sorties',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/sorties').default)
        }, 'sorties')
    }
}, {
    path: 'expeditions',
    name: 'expeditions',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/expeditions').default)
        }, 'expeditions')
    }
}]
