import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducerLocaleId as i18nReducerLocaleId, reducerLocales as i18nReducerLocales, registerNonIsomorphic as i18nRegister } from 'sp-i18n'
import { availableLocales } from '@appConfig/i18n'
import { reducer as realtimeLocationReducer, REALTIME_LOCATION_REDUCER_NAME, actionUpdate } from './redux/realtime-location'
import arrReducers from './redux/reducers.js'
import routes from './router';
import { ImportStyleRoot } from 'sp-css-import'
import { onRouterChange } from '@appUI/layout/nav'
import { init as dbInit } from '@appLogic/database'
import prefs from '@appLogic/preferences'




const ROUTER_REDUCDER_NAME = 'routing'

// Combine Reducers
const reducersObject = {
    'localeId': i18nReducerLocaleId,
    'locales': i18nReducerLocales,
    [ROUTER_REDUCDER_NAME]: routerReducer,
    [REALTIME_LOCATION_REDUCER_NAME]: realtimeLocationReducer
}
arrReducers.forEach(arr => reducersObject[arr[0]] = arr[1])
const reducers = combineReducers(reducersObject)
const store = compose(applyMiddleware(thunk))(createStore)(reducers)









// React initialization
// const langList = navigator.languages ? navigator.languages.join(',') : navigator.language
// const action = i18nActionInit({
//     server: {
//         lang: langList
//     }
// })
// console.log(langList, action)
// store.dispatch(action)
// store.dispatch(i18nActionLocales())
// i18nRegister(store.getState())
const i18nInitAction = i18nRegister(availableLocales)
const localeId = i18nInitAction.localeId
store.dispatch(i18nInitAction)
store.dispatch(i18nRegister(require(`@appLocales/${localeId}.json`)))

if (__DEV__) console.log('state', store.getState())

const routerConfig = {
    history: syncHistoryWithStore(hashHistory, store),
    routes,
    onUpdate: () => {
        onRouterChange()
        store.dispatch(actionUpdate(location))
        self.__LATHPATHNAME__ = location.pathname
    }
}

// hashHistory.listen(location => {
//     store.dispatch(realtimeLocationUpdate(location))
//     if (typeof options.browserHistoryOnUpdate === 'function') options.browserHistoryOnUpdate(location)
// })

if (__DEV__) console.log('router', routerConfig)

@ImportStyleRoot()
class AppWrapper extends React.Component {
    render() {
        return (
            <div id="app-wrapper">
                {this.props.children}
            </div>
        )
    }
}

dbInit()

prefs.init().then(() => {
    ReactDOM.render(
        <Provider store={store} >
            <AppWrapper>
                <Router {...routerConfig} />
            </AppWrapper>
        </Provider>,
        document.getElementById('root')
    )
})
