import routeCheck from 'koot/React/route-check';

export default [
    {
        path: 'sorties',
        name: 'sorties',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Sorties List Page" */
                '@ui/pages/sorties'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    },
    {
        path: 'expeditions',
        name: 'expeditions',
        getComponent: (nextState, cb) => {
            import(
                /* webpackChunkName: "Expeditions List Page" */
                '@ui/pages/expeditions'
            ).then(module => {
                if (routeCheck(nextState)) cb(null, module.default);
            });
        }
    }
];
