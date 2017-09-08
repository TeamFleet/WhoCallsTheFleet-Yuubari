import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { routerReducer } from 'react-router-redux'

//

import clientRouter from './router'
import { ReactApp } from 'super-project/ReactApp'
import { reducer as realtimeLocationReducer, REALTIME_LOCATION_REDUCER_NAME, actionUpdate } from './redux/realtime-location'

// 引用：多语言相关
import {
    reducerLocaleId as i18nReducerLocaleId,
    reducerLocales as i18nReducerLocales,
    register as i18nRegister
} from 'sp-i18n'
import { availableLocales } from '@appConfig/i18n'

// 其他引用，仅针对本项目案例
import { onRouterChange } from '@appUI/layout/nav'
import reducers from './redux/reducers.js'
import { init as dbInit } from '@appLogic/database'
import prefs from '@appLogic/preferences'
// import lastScroll from '@appUtils/last-scroll.js'

const ROUTER_REDUCDER_NAME = 'routing'

const reactApp = new ReactApp({ rootDom: 'root' })

//

if (__DEV__) console.log('client.js')

//

reactApp.redux.middleware.use(thunk)
reactApp.redux.middleware.use(routerMiddleware(browserHistory))

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

//

if (__SERVER__) {
    // 载入所有多语言文件
    let locales = {}
    availableLocales.forEach(locale => {
        locales[locale] = require(`@appLocales/${locale}.json`)
    })
    // 服务器端注册多语言
    i18nRegister(availableLocales, locales)
}

if (__CLIENT__) {
    /*const store = reactApp.run({
    })*/
    prefs.init().then(() => {
        reactApp.run({
            browserHistoryOnUpdate: (location, store) => {
                // 回调: browserHistoryOnUpdate
                // 正常路由跳转时，URL发生变化后瞬间会触发，顺序在react组件读取、渲染之前
                if (__DEV__) {
                    console.log(' ')
                    console.log('browserHistory update', location)
                    console.log(' ')
                }
                store.dispatch(actionUpdate(location))
            }
        })
    })
    // 客户端注册多语言
    i18nRegister(__REDUX_STATE__)
}

dbInit()

//

export {
    reactApp
}