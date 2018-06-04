import routeCheck from 'super-project/React/route-check'

export default [
    {
        path: 'fleets',
        name: 'fleets',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/fleets-indev').default)
            }, 'fleets')
        }
    },
    {
        path: 'fleets/:id.:build',
        name: '舰队模拟配置',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/fleets/details').default)
            }, '舰队模拟配置')
        }
    },
    {
        path: 'fleets-wip',
        name: '舰队模拟',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/fleets').default)
            }, '舰队模拟')
        }
    },
    {
        path: 'calctp',
        name: 'calctp',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/calctp').default)
            }, 'calctp')
        }
    },
    {
        path: 'academy',
        name: 'academy',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                if (routeCheck(nextState)) cb(null, require('@ui/pages/academy').default)
            }, 'academy')
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
