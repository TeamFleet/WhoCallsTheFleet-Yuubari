import routeCheck from 'super-project/React/route-check'

export default [{
    path: 'dev-ipsum',
    name: 'dev-ipsum',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/dev/LoremIpsum.jsx').default)
        }, 'dev-ipsum')
    }
}, {
    path: 'dev-components',
    name: 'dev-components',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/dev/components.jsx').default)
        }, 'dev-components')
    }
}, {
    path: 'dev-icons',
    name: 'dev-icons',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/dev/icons.jsx').default)
        }, 'dev-icons')
    }
}]
