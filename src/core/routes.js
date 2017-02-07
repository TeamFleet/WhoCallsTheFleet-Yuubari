import App from '../ui/App.jsx'

const _require = require
const pathPages = '../ui/pages/'
const requirePage = (callback, file) => {
    _require.ensure([], function (require) {
        callback(null, require('../ui/pages/' + file).default)
    })
}

let childRoutes = [
    {
        path: '/fleets',
        name: 'Fleet Emulator',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Fleet/List.jsx').default)
            })
        }
    },
    {
        path: '/ships',
        name: 'Ship-girls',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Ship/List.jsx').default)
            })
        }
    },
    {
        path: '/equipments',
        name: 'Equipments',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Equipment/List.jsx').default)
            })
        }
    },
    {
        path: '/arsenal',
        name: 'Akashi\'s Arsenal',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Arsenal/Page.jsx').default)
            })
        }
    },
    {
        path: '/entities',
        name: 'CV & Illustrators',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Entity/List.jsx').default)
            })
        }
    },
    {
        path: '/calctp',
        name: 'Calculator: TP',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Calculator/TP.jsx').default)
            })
        }
    },
    {
        path: '/donate',
        name: 'Donate',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Donate.jsx').default)
            })
        }
    }
]

if (window.isDev)
    childRoutes.push({
        path: '/dev',
        getComponents(nextState, callback) {
            _require.ensure([], function (require) {
                callback(null, require(pathPages + 'Dev.jsx').default)
            })
        }
    })

export default {
    path: '/',
    component: App,

    getIndexRoute(partialNextState, callback) {
        _require.ensure([], function (require) {
            callback(null, {
                component: require(pathPages + 'Home.jsx').default,
            })
        })
    },

    // childRoutes: []
    childRoutes: childRoutes
}