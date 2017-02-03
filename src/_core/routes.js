import { Component } from 'react'

import App from '../layout/App.jsx'

let index = '../pages/Home.jsx'
let childRoutes = [
    {
        path: 'fleets',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Fleet/List.jsx').default)
            })
        }
    },
    {
        path: 'ships',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Ship/List.jsx').default)
            })
        }
    },
    {
        path: 'equipments',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Equipment/List.jsx').default)
            })
        }
    },
    {
        path: 'arsenal',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Arsenal/Page.jsx').default)
            })
        }
    },
    {
        path: 'entities',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Entity/List.jsx').default)
            })
        }
    },
    {
        path: 'calctp',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Calculator/TP.jsx').default)
            })
        }
    },
    {
        path: 'donate',
        getComponents(nextState, callback) {
            require.ensure([], function (require) {
                callback(null, require('../pages/Donate.jsx').default)
            })
        }
    }
]

if (window.isDev)
    childRoutes.push({
        path: 'dev',
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
                component: require(index).default
            })
        })
    },

    childRoutes: childRoutes
}