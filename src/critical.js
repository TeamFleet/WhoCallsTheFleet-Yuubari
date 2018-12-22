import bindEvent from 'bind-event'
import {
    handlerBeforeReact as beforeinstallpromptHandlerBeforeReact
} from '@utils/install-app'

require('./critical.g.less')

// this.isAppReady = false

// Critical 过程
const doCricital = () => {

    if (self && self.isCriticalInit) return true
    if (__DEV__) console.log('🚨 Initializing: critical process...')

    self.isCriticalInit = true

    self._html = document.documentElement

    // 内置背景图列表
    self.__BGIMG_LIST__ = __BGIMG_LIST__ || []

    // 利用 Promise 语法写入 script 标签
    self.importJS = uri => new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.onerror = () => reject()
        script.onload = () => resolve()
        document.getElementsByTagName('head')[0].appendChild(script)
        script.src = uri
        script.type = "text/javascript"
        script.async = false
    })

    // App 初始化成功
    self.appReady = () => {
        if (self.isAppReady) return true

        self.isAppReady = true

        // 注册 service-worker
        if (__DEV__)
            console.log('👩‍💻 No Service Worker for DEV mode.')
        else if ('serviceWorker' in navigator) {
            // console.log('Service Worker SUPPORTED')
            navigator.serviceWorker.register(self.__SERVICE_WORKER_FILENAME__, {
                scope: '/'
            }).then((/*reg*/) => {
                // console.log('👩‍💻 Service Worker REGISTER', reg)
            }).catch((err) => {
                console.log('👩‍💻 Service Worker SUPPORTED. ERROR', err)
            })
        } else {
            console.log('👩‍💻 Service Worker not supported!')
        }

        setTimeout(() => {

            if (__DEV__) self.logHr()
            if (__DEV__) console.log('🚀 App ready')
            if (__DEV__) self.logHr()

            console.log(`
 _____ _           ______ _           _   
|_   _| |          |  ___| |         | |  
  | | | |__   ___  | |_  | | ___  ___| |_ 
  | | | '_ \\ / _ \\ |  _| | |/ _ \\/ _ \\ __|
  | | | | | |  __/ | |   | |  __/  __/ |_ 
  \\_/ |_| |_|\\___| \\_|   |_|\\___|\\___|\\__|

`)

            document.body.classList.add('is-ready')

            setTimeout(() => {
                self.isAppReadyFull = true
            }, 1000)
        })
    }

    // App 初始化失败
    self.onInitError = () => {

    }

    // 在 console 中 log 一行 ==========
    self.logHr = function () {
        console.log('========================================')
    }

    // 检查 UA / 客户端环境
    let platform = 'not-specified'
    const iOSversion = () => {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    }
    if (typeof navigator === 'object') {
        const UA = navigator.userAgent
        if (/Android|HTC/i.test(UA)) {
            self.isMobile = true
            platform = 'android'
        } else if (/iPad/i.test(UA)) {
            // iPad
            self.isMobile = true
            self.isIOS = true
            platform = 'ios'
        } else if (/iPod|iPhone/i.test(UA)) {
            // iPhone
            self.isMobile = true
            self.isIOS = true
            platform = 'ios'
        } else if (/Mobile/i.test(UA) && /Safari/i.test(UA)) {
            // general iOS
            self.isMobile = true
            self.isIOS = true
            platform = 'ios'
        }
        if (/UCBrowser/.test(UA)) {
            self.isUC = true
        }

        const thisIOSversion = iOSversion()
        self.iOSversion = Array.isArray(thisIOSversion) ? thisIOSversion[0] : undefined
        if (Array.isArray(thisIOSversion) && thisIOSversion[0] < 10) {
            self.isMobile = true
            self.isIOS = true
            self.isOldIOS = true
        }

        self.isAlipay = (
            /AlipayChannelId/.test(UA) ||
            /AlipayDefined/.test(UA) ||
            /AliApp/.test(UA) ||
            /AlipayClient/.test(UA)
        )
        self.isAliPay = self.isAlipay

        self.isWechat = (
            /MicroMessenger/.test(UA)
        )
        self.isWeChat = self.isWechat
        self.isWX = self.isWechat
        self.isWx = self.isWechat
    }

    // 根据 UA / 客户端环境 添加基础class
    if (__CLIENT__) {
        self._html.classList.add('is-webapp')
        self._html.classList.add('is-critical-ready')
    }
    if (__DEV__)
        self._html.classList.add('is-dev')
    if (self.isMobile)
        self._html.classList.add('is-mobile')
    if (platform)
        self._html.classList.add('platform-' + platform)

    // DOM ready 时
    document.addEventListener("DOMContentLoaded", function () {
        // let boatLoader = document.createElement('div')
        const boatLoader = document.getElementById('boat-loader')
        self.isMobile = false
        // let platform = 'not-specified'

        // boatLoader.id = 'boat-loader'
        // document.body.appendChild(boatLoader)
        bindEvent(
            boatLoader,
            'transitionend',
            function (evt) {
                // console.log(evt, evt.target.style.opacity)
                if (evt.propertyName == 'opacity' && !evt.target.style.opacity)
                    evt.target.parentNode.removeChild(evt.target)
            }
        )

        // 检查 WebP 支持
        const canUseWebP = () => {
            var elem = document.createElement('canvas');
            if (elem.getContext && elem.getContext('2d')) {
                // was able or not to get WebP representation
                return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
            }
            else {
                // very old browser like IE 8, canvas not supported
                return false;
            }
        }
        if (canUseWebP()) self._html.classList.add('webp')

        // 开发模式: 插入SVG图标库
        // if (__DEV__) {
        //     let div = document.createElement("div");
        //     div.className = 'hide';
        //     div.innerHTML = __ICONSVG__
        //     document.body.insertBefore(div, document.body.childNodes[0])
        // }

        // online / offline
        function doOnline() {
            // console.log('online')
            self._html.classList.remove('is-offline')
        }
        function doOffline() {
            // console.log('offline')
            self._html.classList.add('is-offline')
        }
        window.addEventListener('online', doOnline)
        window.addEventListener('offline', doOffline)
        if (navigator.onLine === false) doOffline()

        // 利用 pointer event 判断当前是否为 hover
        if (window.PointerEvent) {
            self._html.classList.add('is-hover')
            document.documentElement.addEventListener("pointerenter", (evt) => {
                if (evt.pointerType === 'mouse' || evt.pointerType === 'pen')
                    self._html.classList.add('is-hover')
                else
                    self._html.classList.remove('is-hover')
            });
            document.documentElement.addEventListener("pointerleave", () => {
                self._html.classList.remove('is-hover')
            });
        } else {
            document.documentElement.addEventListener("mouseenter", () => {
                self._html.classList.add('is-hover')
            });
            document.documentElement.addEventListener("mouseleave", () => {
                self._html.classList.remove('is-hover')
            });
        }

        // self._html = tagHtml
    })

    // 安装 PWA 事件: 如果在 React 渲染前触发
    window.addEventListener('beforeinstallprompt', beforeinstallpromptHandlerBeforeReact)

    // 检查客户端兼容性，如果需要，载入兼容性扩展脚本
    new Promise(resolve => {
        if (typeof Object.assign !== 'function') {
            if (__DEV__) console.log('🚨 Old browser detected. Importing compatibility extend file(s)...')
            self.importJS(
                typeof self.__CRITICAL_EXTRA_OLD_IE_FILENAME__ == 'undefined'
                    ? "/client/critical-extra-old-ie.js"
                    : self.__CRITICAL_EXTRA_OLD_IE_FILENAME__
            ).then(() => {
                if (__DEV__) console.log('   ✔ Imported!')
                resolve()
            }).catch(() => {
                if (__DEV__) console.log('   ❌ Importe failed!')
                throw new Error('Importing compatibility extend file(s) failed')
            })
        } else
            resolve()
    }).then(() => {
        // [nw.js] show and focus window
        if (self.nw && self.nw.win) {
            self.nw.win.show()
            self.nw.win.focus()
        }
        // self.__LATHPATHNAME__
    })
        .then(() => {
            if (__DEV__) console.log('🚨 Complete: critical process!')
        })
        .catch(err => self.onInitError(err))
    // .then(() => self.importJS(self.__CLIENT_FILENAME__))
}

doCricital()
