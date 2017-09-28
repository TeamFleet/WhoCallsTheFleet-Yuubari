import { routeCheck } from './'

export default [{
    path: 'fleets',
    name: 'fleets',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/fleets.jsx').default)
        }, 'fleets')
    }
}, {
    path: 'calculators',
    name: 'calculators',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/calculators').default)
        }, 'calculators')
    }
}, {
    path: 'sets',
    name: 'sets',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            if (routeCheck(nextState)) cb(null, require('@appUI/pages/sets').default)
        }, 'sets')
    }
},

// redirects
{
    path: 'calctp',
    name: 'calctp',
    isRedirect: true,
    onEnter: ({ params }, replace) => replace(`/calculators/calctp`)
}]