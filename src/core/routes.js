const pathPages = '../ui/pages/'

console.log(typeof require.ensure)

let childRoutes = [
    {
        path: '/fleets',
        name: 'Fleet Emulator',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Fleet/List.jsx').default)
            })
        }
    },
    {
        path: '/ships',
        name: 'Ship-girls',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Ship/List.jsx').default)
            })
        }
    },
    {
        path: '/equipments',
        name: 'Equipments',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Equipment/List.jsx').default)
            })
        }
    },
    {
        path: '/arsenal',
        name: 'Akashi\'s Arsenal',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Arsenal/Page.jsx').default)
            })
        }
    },
    {
        path: '/entities',
        name: 'CV & Illustrators',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Entity/List.jsx').default)
            })
        }
    },
    {
        path: '/calctp',
        name: 'Calculator: TP',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Calculator/TP.jsx').default)
            })
        }
    },
    {
        path: '/donate',
        name: 'Donate',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Donate.jsx').default)
            })
        }
    }
]

if (window.isDev)
    childRoutes.push({
        path: '/dev',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../ui/pages/Dev.jsx').default)
            })
        }
    })

export default {
    path: '/',
    component: require('../ui/App.jsx').default,

    getIndexRoute(partialNextState, callback) {
        require.ensure([], function (require) {
            callback(null, {
                component: require('../ui/pages/Home.jsx').default
            })
        })
    },

    // childRoutes: []
    childRoutes: childRoutes
}