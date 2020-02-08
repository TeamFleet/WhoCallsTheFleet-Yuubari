// 检查当前URL与路由配置路径是否相匹配，如果否，则不予渲染组件
// 通常在网络连接情况较差的情况下，容易出现不匹配的情况
import routeCheck from 'koot/React/route-check';

import Root from '@ui/app';

import tools from './tools';
import operations from './operations';
import data from './data';

const dev = __DEV__ ? require('./dev').default : [];

// if (__DEV__) console.log('routes-dev', dev)

export default {
    path: __SPA__ ? '/' : '',
    component: Root,
    name: 'page-app',

    indexRoute: {
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Home Page" */
                '@ui/pages/home'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },

    childRoutes: [
        ...tools,
        ...operations,
        ...data,

        {
            path: 'about',
            name: 'about',
            getComponent: (nextState, cb) => {
                import(
                    /* webpackChunkName: "About Page" */
                    '@ui/pages/about'
                ).then(module => {
                    if (routeCheck(nextState)) cb(null, module.default);
                });
            }
        },

        ...dev
    ].filter(r => !!r)
};
