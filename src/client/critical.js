import bindEvent from 'bind-event'

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

        // 检查 WebP 支持
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = function () {
            if (webP.height === 2) tagHtml.classList.add('webp')
        }

        // 开发模式: 插入SVG图标库
        if (__DEV__) {
            let div = document.createElement("div");
            div.className = 'hide';
            div.innerHTML = __ICONSVG__
            document.body.insertBefore(div, document.body.childNodes[0])
        }

        self._html = tagHtml
    })

    // [nw.js] show and focus window
    if (self.nw && self.nw.win) {
        self.nw.win.show()
        self.nw.win.focus()
    }

    self.isCriticalInit = true
})()
