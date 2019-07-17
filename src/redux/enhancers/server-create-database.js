import { getCache } from 'koot';
import initDatabase from '__FLEET_INIT_DATABASE_ONLY_SERVER__';

/**
 * _仅针对服务器端_
 *
 * Redux store enhancer: 初始化 database 并附加在 store 对象上
 *
 * @param {Function} createStore
 * @returns {Object} store
 */
const databaseEnhancer = createStore => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer);

    if (__SERVER__) {
        const cache = getCache();
        // TODO: 更改缓存空间的使用方式
        if (!cache.__database) cache.__database = initDatabase(store).db;
        store.__database = cache.__database;
    }

    return store;
};

export default databaseEnhancer;

//
