import routeCheck from 'koot/React/route-check'

export default [
    {
        path: 'fleets',
        name: 'fleets',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/fleets-indev').default)
            }, 'Fleet Builder')
        }
    },
    {
        path: 'fleets/:id.:build',
        name: '舰队模拟配置',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/fleets/details').default)
            }, 'Fleet Builder Fleet Details')
        }
    },
    {
        path: 'fleets-wip',
        name: '舰队模拟',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/fleets').default)
            }, 'Fleet Builder (WIP)')
        }
    },
    {
        path: 'calctp',
        name: 'calctp',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/calctp').default)
            }, 'TP Calculator')
        }
    },
    {
        path: 'academy',
        name: 'academy',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/academy').default)
            }, 'Academy')
        }
    },
    // {
    //     path: 'sets',
    //     name: 'sets',
    //     getComponent: (nextState, cb) => {
    //         require.ensure([], (require) => {
    //             if (routeCheck(nextState)) cb(null, require('@ui/pages/sets').default)
    //         }, 'sets')
    //     }
    // },

    // redirects
    // {
    //     path: 'calctp',
    //     name: 'calctp',
    //     isRedirect: true,
    //     onEnter: ({ params }, replace) => replace(`/calculators/calctp`)
    // }
]
