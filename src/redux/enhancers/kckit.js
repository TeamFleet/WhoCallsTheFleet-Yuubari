import createRaw from '@database/create-raw'

/**
 * Redux store enhancer: 将 raw KC database 附加在 store 对象上
 * - `store.rawNeDB`
 * - `store.shipCollections`
 * - `store.equipmentCollections`
 * @param {Function} createStore 
 * @returns {Object} store
 */
const databaseEnhancer = (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    Object.assign(store, createRaw())
    return store
}

export default databaseEnhancer
