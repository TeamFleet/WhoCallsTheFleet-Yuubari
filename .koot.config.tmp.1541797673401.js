export const name = "The Fleet (Yuubari)";
export const type = "react";
export const template = "./src/app/template.ejs";
export const router = require('./src/app/router').default;
export const redux = {"combineReducers":require('./src/app/redux/reducers').default};
export const client = {"history":"browser","before":require('./src/app/lifecycle/before').default,"after":require('./src/app/lifecycle/after').default,"onRouterUpdate":require('./src/app/lifecycle/on-router-update').default,"onHistoryUpdate":require('./src/app/lifecycle/on-history-update').default};
export const server = __SERVER__ ? {"koaStatic":{"maxage":0,"hidden":true,"index":"index.html","defer":false,"gzip":true,"extensions":false},"renderCache":{"maxAge":10000},"inject":require('./src/server/inject').default,"before":require('./src/server/lifecycle/before').default,"after":require('./src/server/lifecycle/after').default,"onRender":require('./src/server/lifecycle/on-render').default} : {};