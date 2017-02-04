import { Component } from 'react'

import App from '../layout/App.jsx'

let childRoutes = [
    {
        path: '/fleets',
        name: 'Fleet Emulator',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Fleet/List.jsx').default)
            })
        }
    },
    {
        path: '/ships',
        name: 'Ship-girls',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Ship/List.jsx').default)
            })
        }
    },
    {
        path: '/equipments',
        name: 'Equipments',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Equipment/List.jsx').default)
            })
        }
    },
    {
        path: '/arsenal',
        name: 'Akashi\'s Arsenal',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Arsenal/Page.jsx').default)
            })
        }
    },
    {
        path: '/entities',
        name: 'CV & Illustrators',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Entity/List.jsx').default)
            })
        }
    },
    {
        path: '/calctp',
        name: 'Calculator: TP',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Calculator/TP.jsx').default)
            })
        }
    },
    {
        path: '/donate',
        name: 'Donate',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Donate.jsx').default)
            })
        }
    }
]

if (window.isDev)
    childRoutes.push({
        path: '/dev',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Dev.jsx').default)
            })
        }
    })

export default {
    path: '/',
    component: App,

    getIndexRoute(partialNextState, callback) {
        require.ensure([], function (require) {
            callback(null, {
                component: require('../pages/Home.jsx').default
            })
        })
    },

    childRoutes: childRoutes
}