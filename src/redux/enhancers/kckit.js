import create from '@database/create'
// import kckit from 'kckit'

/**
 * Redux store enhancer: KC database
 * - 将 KC database 附加在 store 对象上
 * - `store.database`
 * @param {Function} createStore 
 * @returns {Object} store
 */
const databaseEnhancer = (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    store.database = create()
    // store.kckit = kckit
    return store
}

export default databaseEnhancer
