import bindEvent from 'bind-event'
import Background from './logic/bgimg/class.js'

(() => {
    if (self && self.isCriticalInit) return true

    self.importJS = (uri) => {
        let s = document.createElement('script')
        s.src = uri
        s.type = "text/javascript"
        s.async = false
        document.getElementsByTagName('head')[0].appendChild(s)
    }

    // if Object.assign not supported, load /client/critical-old-ie.js
    if (typeof Object.assign != 'function') self.importJS(
        typeof __CRITICAL_EXTRA_OLD_IE_FILENAME__ == 'undefined' ? "/client/critical-extra-old-ie.js" : __CRITICAL_EXTRA_OLD_IE_FILENAME__
    )

    require('./critical.g.less')

    // 内置背景图列表
    self.__BGIMG_LIST__ = __BGIMG_LIST__

    // 处理服务器返回的背景图数据
    // if (self.__REDUX_STATE__.bgimg) {
    //     if (self.__REDUX_STATE__.bgimg.current)
    //         self.__REDUX_STATE__.bgimg.current = new Background(self.__REDUX_STATE__.bgimg.current)

    //     if (self.__REDUX_STATE__.bgimg.list)
    //         for (let i in self.__REDUX_STATE__.bgimg.list)
    //             self.__REDUX_STATE__.bgimg.list[i].forEach((item, index) => {
    //                 self.__REDUX_STATE__.bgimg.list[i][index] = new Background(item)
    //             })
    // }

    document.addEventListener("DOMContentLoaded", function () {
        let boatLoader = document.createElement('div')
        let tagHtml = document.getElementsByTagName('html')
        self.isMobile = false
        let platform = 'not-specified'

        boatLoader.id = 'boat-loader'
        document.body.appendChild(boatLoader)
        bindEvent(
            boatLoader,
            'transitionend',
            function (evt) {
                // console.log(evt, evt.target.style.opacity)
                if (evt.propertyName == 'opacity' && !evt.target.style.opacity)
                    evt.target.parentNode.removeChild(evt.target)
            }
        )

        if (tagHtml && tagHtml.length) {
            tagHtml = tagHtml[0]
            if (typeof navigator !== 'undefined') {
                const UA = navigator.userAgent
                if (/Android|HTC/i.test(UA)) {
                    self.isMobile = true
                    platform = 'android'
                } else if (/iPad/i.test(UA)) {
                    // iPad
                    self.isMobile = true
                    platform = 'ios'
                } else if (/iPod|iPhone/i.test(UA)) {
                    // iPhone
                    self.isMobile = true
                    platform = 'ios'
                } else if (/Mobile/i.test(UA) && /Safari/i.test(UA)) {
                    // general iOS
                    self.isMobile = true
                    platform = 'ios'
                }
            }
            if (self.isMobile) {
                tagHtml.classList.add('is-mobile')
            }
            if (platform) {
                tagHtml.classList.add('platform-' + platform)
            }
        }
    })

    // [nw.js] show and focus window
    if (self.nw && self.nw.win) {
        self.nw.win.show()
        self.nw.win.focus()
    }

    self.isCriticalInit = true
})()
