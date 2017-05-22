import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { routerReducer } from 'react-router-redux'
import { redux, createConfigureStore, router, run } from 'sp-base/client'

// 引用：多语言相关
import {
    reducerLocaleId as i18nReducerLocaleId,
    reducerLocales as i18nReducerLocales,
    register as i18nRegister
} from 'sp-i18n'
import { availableLocales } from 'Config/i18n'

// 引用：router
import clientRouter from './router'

// 其他引用，仅针对本项目案例
import { onRouterChange } from './ui/layout/nav.jsx'
import reducers from './redux/reducers.js'
import { init as dbInit } from './logic/database'
import lastScroll from 'Utils/last-scroll.js'



// ----------------------------------------------------------------------------
// 代码中行首的 /***/ 标记代表该行代码仅针对本项目案例
// ----------------------------------------------------------------------------



// redux middleware
redux.use(thunk)
redux.use(routerMiddleware(browserHistory))

// 设定项目所用的 redux reducer
redux.reducer.use('routing', routerReducer)
redux.reducer.use('localeId', i18nReducerLocaleId)
redux.reducer.use('locales', i18nReducerLocales)
reducers.forEach(arr => {
    redux.reducer.use(arr[0], arr[1])
})

// 设定项目所用的 react-router
router.use({
    path: '',
    // component: App, 可扩展1层component
    childRoutes: [clientRouter]
})

let isGAInit = false
// 定制 react-router
router.ext({
    onUpdate: () => {
        // if (__DEV__) console.log('router onUpdate', self.__LATHPATHNAME__, location.pathname)

        if (self.__LATHPATHNAME__)
            lastScroll.set(self.__LATHPATHNAME__, window.scrollY)

        // 统计代码第一次默认走html引入js
        if (isGAInit) {

        }
        isGAInit = true

        /***/ onRouterChange()

        self.__LATHPATHNAME__ = location.pathname
    }
})

if (__SERVER__) {
    // 载入所有多语言文件
    let locales = {}
    availableLocales.forEach(locale => {
        locales[locale] = require(`Locales/${locale}.json`)
    })
    // 服务器端注册多语言
    i18nRegister(availableLocales, locales)
}

//
if (__CLIENT__) {
    const store = run({
        browserHistoryOnUpdate: (location) => {
            if (__DEV__) console.log('browserHistory update', location)
        }
    })

    // 客户端注册多语言
    i18nRegister(__REDUX_STATE__)

}

dbInit()

//
export {
    router,
    createConfigureStore
}
