import { routeCheck } from './'

export default [
    {
        path: 'fleets',
        name: 'fleets',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@appUI/pages/fleets').default)
            }, 'fleets')
        }
    },
    {
        path: 'calctp',
        name: 'calctp',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@appUI/pages/calctp').default)
            }, 'calctp')
        }
    },
    {
        path: 'combat',
        name: 'combat',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@appUI/pages/combat').default)
            }, 'combat')
        }
    },
    {
        path: 'sets',
        name: 'sets',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@appUI/pages/sets').default)
            }, 'sets')
        }
    },

    // redirects
    // {
    //     path: 'calctp',
    //     name: 'calctp',
    //     isRedirect: true,
    //     onEnter: ({ params }, replace) => replace(`/calculators/calctp`)
    // }
]