import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'

//

import clientRouter from './router'
import { ReactApp } from 'super-project/ReactApp'
import { reducer as realtimeLocationReducer, REALTIME_LOCATION_REDUCER_NAME, actionUpdate } from 'sp-isomorphic-utils/realtime-location'

// 引用：多语言相关
import {
    reducerLocaleId as i18nReducerLocaleId,
    reducerLocales as i18nReducerLocales,
    register as i18nRegister
} from 'sp-i18n'
// import { availableLocales } from '@appConfig/i18n'

// 其他引用，仅针对本项目案例
import { onRouterChange } from '@appUI/layout/nav'
import reducers from './redux/reducers.js'
import { init as dbInit } from '@appLogic/database'
import prefs from '@appLogic/preferences'
// import lastScroll from '@appUtils/last-scroll.js'
// import kckit from 'kckit'

const ROUTER_REDUCDER_NAME = 'routing'

const reactApp = new ReactApp({ rootDom: 'root' })

//

if (__DEV__ && __CLIENT__) self.logHr()
if (__DEV__) console.log('⚓ Client initialing...')

//

reactApp.redux.middleware.use(thunk)
reactApp.redux.middleware.use(routerMiddleware(browserHistory))
if (__CLIENT__) self.routerHistory = browserHistory

// 

reactApp.redux.reducer.use(ROUTER_REDUCDER_NAME, routerReducer) // 路由状态扩展
reactApp.redux.reducer.use(REALTIME_LOCATION_REDUCER_NAME, realtimeLocationReducer) // 目的：新页面请求处理完成后再改变URL
reactApp.redux.reducer.use("localeId", i18nReducerLocaleId)
reactApp.redux.reducer.use("locales", i18nReducerLocales)
reducers.forEach(arr => reactApp.redux.reducer.use(arr[0], arr[1]))

// 

let isGAInit = false
reactApp.react.router.use({
    path: '',
    // component: App, 可扩展1层component
    childRoutes: [clientRouter]
})

//
// server端初始化进程参见 ../server/index.js
// if (__SERVER__) { }

if (__CLIENT__) {
    reactApp.react.router.ext({
        onUpdate: () => {
            // if (__DEV__) console.log('router onUpdate', self.__LATHPATHNAME__, location.pathname)
    
            // if (self.__LATHPATHNAME__)
            //     lastScroll.set(self.__LATHPATHNAME__, window.scrollY)
    
            // 统计代码第一次默认走html引入js
            if (typeof ga !== 'undefined' && isGAInit) {
                ga('send', 'pageview')
            }
            isGAInit = true
    
            /***/ onRouterChange()
    
            self.__LATHPATHNAME__ = location.pathname
        }
    })

    /*const store = reactApp.run({
    })*/
    prefs.init()
        // 注册多语言
        .then(() => i18nRegister(__REDUX_STATE__))
        // 初始化数据库
        .then(() => dbInit())
        .then(() => {
            if (__CLIENT__ && self._html)
                self._html.classList.add('is-client-ready')
        })
        // 渲染React
        .then(() => reactApp.run({
            browserHistoryOnUpdate: (location, store) => {
                // 回调: browserHistoryOnUpdate
                // 正常路由跳转时，URL发生变化后瞬间会触发，顺序在react组件读取、渲染之前
                if (__DEV__) {
                    console.log('🌏 browserHistory update', location)
                    // console.log(actionUpdate(location))
                }
                store.dispatch(actionUpdate(location))
                // console.log(store.getState())
            }
        }))
        .then(() => {
            if (__DEV__) console.log('⚓ Client inited.')
        })
}

//
if (__DEV__) console.log('⚓ Client inited...')

export {
    reactApp
}