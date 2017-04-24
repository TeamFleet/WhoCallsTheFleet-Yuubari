import Root from 'UI/Root.jsx'

export default {
    path: '',
    component: Root,
    name: 'page-app',
    childRoutes: [        
        {
            path: 'home',
            name: 'home',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('UI/pages/Home').default)
                }, 'home')
            },
            isIndex: true
        },
        {
            path: 'about',
            name: 'about',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('UI/pages/About').default)
                }, 'about')
            }
        }
    ]
}