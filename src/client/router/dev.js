import {routeCheck} from './'

export default __DEV__ ? [{
    path: 'dev',
    name: 'dev',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('UI/pages/dev.jsx').default)
        }, 'dev')
    }
}] : []