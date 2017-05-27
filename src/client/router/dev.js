import { routeCheck } from './'

export default [{
    path: 'dev-ipsum',
    name: 'dev-ipsum',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/dev/LoremIpsum.jsx').default)
        }, 'dev-ipsum')
    }
}, {
    path: 'dev-components',
    name: 'dev-components',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/dev/components.jsx').default)
        }, 'dev-components')
    }
}]