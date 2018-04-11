import { onRouterChange } from '@appUI/layout/nav'

let isGAInit = false

export default () => {
    // if (__DEV__) console.log('router onUpdate', self.__LATHPATHNAME__, location.pathname)

    // if (self.__LATHPATHNAME__)
    //     lastScroll.set(self.__LATHPATHNAME__, window.scrollY)

    // 统计代码第一次默认走html引入js
    if (typeof ga !== 'undefined' && isGAInit)
        ga('send', 'pageview')

    isGAInit = true
    onRouterChange()
    self.__LATHPATHNAME__ = location.pathname
}
