import App from '../ui/App.jsx'

const _require = require
const requirePage = (callback, path) => {
    _require.ensure([], function (require) {
        callback(null, require('../ui/pages/' + path).default)
    })
}

let childRoutes = [
    {
        path: '/fleets',
        name: 'Fleet Emulator',
        getComponents(nextState, callback) {
            requirePage(callback, 'Fleet/List.jsx')
        }
    },
    {
        path: '/ships',
        name: 'Ship-girls',
        getComponents(nextState, callback) {
            requirePage(callback, 'Ship/List.jsx')
        }
    },
    {
        path: '/equipments',
        name: 'Equipments',
        getComponents(nextState, callback) {
            requirePage(callback, 'Equipment/List.jsx')
        }
    },
    {
        path: '/arsenal',
        name: 'Akashi\'s Arsenal',
        getComponents(nextState, callback) {
            requirePage(callback, 'Arsenal/Page.jsx')
        }
    },
    {
        path: '/entities',
        name: 'CV & Illustrators',
        getComponents(nextState, callback) {
            requirePage(callback, 'Entity/List.jsx')
        }
    },
    {
        path: '/calctp',
        name: 'Calculator: TP',
        getComponents(nextState, callback) {
            requirePage(callback, 'Calculator/TP.jsx')
        }
    },
    {
        path: '/donate',
        name: 'Donate',
        getComponents(nextState, callback) {
            requirePage(callback, 'Donate.jsx')
        }
    }
]

if (window.isDev)
    childRoutes.push({
        path: '/dev',
        getComponents(nextState, callback) {
            requirePage(callback, 'Dev.jsx')
        }
    })

export default {
    path: '/',
    component: App,

    getIndexRoute(partialNextState, callback) {
        _require.ensure([], function (require) {
            callback(null, {
                component: require('../ui/pages/Home.jsx').default,
            })
        })
    },

    // childRoutes: []
    childRoutes: childRoutes
}