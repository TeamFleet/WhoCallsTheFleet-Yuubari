import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reduxForCreateStore } from 'koot'
import reducers from './reducers'
import KCKitEnhancer from './enhancers/kckit'

/**
 * 项目自创建 store 的方法
 */
export default () => {
    const {
        reducers: defaultReducers, initialState, middlewares
    } = reduxForCreateStore

    return createStore(
        combineReducers({
            ...defaultReducers,
            ...reducers
        }),
        initialState,
        compose(
            applyMiddleware(...middlewares),
            KCKitEnhancer
        )
    )
}
