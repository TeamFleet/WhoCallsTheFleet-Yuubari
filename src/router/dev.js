import routeCheck from 'koot/React/route-check'

export default [{
    path: 'dev-ipsum',
    name: 'dev-ipsum',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@ui/pages/dev/LoremIpsum.jsx').default)
        }, 'DEV. Lorem-ipsum')
    }
}, {
    path: 'dev-components',
    name: 'dev-components',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@ui/pages/dev/components.jsx').default)
        }, 'DEV. Components')
    }
}, {
    path: 'dev-icons',
    name: 'dev-icons',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@ui/pages/dev/icons.jsx').default)
        }, 'DEV. Icons')
    }
}]
