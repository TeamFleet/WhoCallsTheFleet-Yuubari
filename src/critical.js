/* eslint-disable no-console */
import bindEvent from 'bind-event';
import { handlerBeforeReact as beforeinstallpromptHandlerBeforeReact } from '@utils/install-app';

require('./critical.g.less');

// this.isAppReady = false

// Critical 过程
const doCricital = () => {
    if (typeof window === 'undefined') return;
    if (window && window.isCriticalInit) return true;

    if (__DEV__) console.log('🚨 Initializing: critical process...');

    window.isCriticalInit = true;

    // 内置背景图列表
    window.__BGIMG_LIST__ = __BGIMG_LIST__ || [];

    // 利用 Promise 语法写入 script 标签
    window.importJS = (uri) =>
        new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.onerror = () => reject();
            script.onload = () => resolve();
            document.getElementsByTagName('head')[0].appendChild(script);
            script.src = uri;
            script.type = 'text/javascript';
            script.async = false;
        });

    // App 初始化成功
    window.appReady = () => {
        if (window.isAppReady) return true;

        window.isAppReady = true;

        // 注册 service-worker
        if (__DEV__) console.log('👩‍💻 No Service Worker for DEV mode.');
        else if ('serviceWorker' in navigator) {
            // console.log('Service Worker SUPPORTED')
            navigator.serviceWorker
                .register(window.__SERVICE_WORKER_FILENAME__, {
                    scope: '/',
                })
                .then((/*reg*/) => {
                    // console.log('👩‍💻 Service Worker REGISTER', reg)
                })
                .catch((err) => {
                    console.log('👩‍💻 Service Worker SUPPORTED. ERROR', err);
                });
        } else {
            console.log('👩‍💻 Service Worker not supported!');
        }

        setTimeout(() => {
            if (__DEV__) window.logHr();
            if (__DEV__) console.log('🚀 App ready');
            if (__DEV__) window.logHr();

            console.log(`
 _____ _           ______ _           _
|_   _| |          |  ___| |         | |
  | | | |__   ___  | |_  | | ___  ___| |_
  | | | '_ \\ / _ \\ |  _| | |/ _ \\/ _ \\ __|
  | | | | | |  __/ | |   | |  __/  __/ |_
  \\_/ |_| |_|\\___| \\_|   |_|\\___|\\___|\\__|

`);

            document.body.classList.add('is-ready');

            setTimeout(() => {
                window.isAppReadyFull = true;
            }, 1000);
        });
    };

    // App 初始化失败
    window.onInitError = () => {};

    // 在 console 中 log 一行 ==========
    window.logHr = function () {
        console.log('========================================');
    };

    // 检查 UA / 客户端环境
    let platform = 'not-specified';
    const iOSversion = () => {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [
                parseInt(v[1], 10),
                parseInt(v[2], 10),
                parseInt(v[3] || 0, 10),
            ];
        }
    };
    if (typeof navigator === 'object') {
        const UA = navigator.userAgent;
        if (/Android|HTC/i.test(UA)) {
            window.isMobile = true;
            platform = 'android';
        } else if (/iPad/i.test(UA)) {
            // iPad
            window.isMobile = true;
            window.isIOS = true;
            platform = 'ios';
        } else if (/iPod|iPhone/i.test(UA)) {
            // iPhone
            window.isMobile = true;
            window.isIOS = true;
            platform = 'ios';
        } else if (/Mobile/i.test(UA) && /Safari/i.test(UA)) {
            // general iOS
            window.isMobile = true;
            window.isIOS = true;
            platform = 'ios';
        }
        if (/UCBrowser/.test(UA)) {
            window.isUC = true;
        }

        const thisIOSversion = iOSversion();
        window.iOSversion = Array.isArray(thisIOSversion)
            ? thisIOSversion[0]
            : undefined;
        if (Array.isArray(thisIOSversion) && thisIOSversion[0] < 10) {
            window.isMobile = true;
            window.isIOS = true;
            window.isOldIOS = true;
        }

        window.isAlipay =
            /AlipayChannelId/.test(UA) ||
            /AlipayDefined/.test(UA) ||
            /AliApp/.test(UA) ||
            /AlipayClient/.test(UA);
        window.isAliPay = window.isAlipay;

        window.isWechat = /MicroMessenger/.test(UA);
        window.isWeChat = window.isWechat;
        window.isWX = window.isWechat;
        window.isWx = window.isWechat;
    }

    // 根据 UA / 客户端环境 添加基础class
    if (__CLIENT__) {
        document.documentElement.classList.add('is-webapp');
        document.documentElement.classList.add('is-critical-ready');
    }
    if (__DEV__) document.documentElement.classList.add('is-dev');
    if (window.isMobile) document.documentElement.classList.add('is-mobile');
    if (platform)
        document.documentElement.classList.add('platform-' + platform);

    // DOM ready 时
    document.addEventListener('DOMContentLoaded', function () {
        // TODO 检查必要的支持的技术，如果存在不支持的，渲染错误信息
        /**
         * 检查的信息
         * - **CSS**
         *     - position: sticky
         * - **JS**
         *     - Object.assign()
         */

        // let boatLoader = document.createElement('div')
        const boatLoader = document.getElementById('boat-loader');
        window.isMobile = false;
        // let platform = 'not-specified'

        // boatLoader.id = 'boat-loader'
        // document.body.appendChild(boatLoader)
        bindEvent(boatLoader, 'transitionend', (evt) => {
            // console.log(evt, evt.target.style.opacity)
            if (evt.target !== boatLoader) return;
            if (
                evt.propertyName === 'opacity' &&
                !parseInt(window.getComputedStyle(boatLoader).opacity)
            )
                evt.target.parentNode.removeChild(evt.target);
        });

        // 检查 WebP 支持
        const canUseWebP = () => {
            var elem = document.createElement('canvas');
            if (elem.getContext && elem.getContext('2d')) {
                // was able or not to get WebP representation
                return (
                    elem.toDataURL('image/webp').indexOf('data:image/webp') ===
                    0
                );
            } else {
                // very old browser like IE 8, canvas not supported
                return false;
            }
        };
        if (canUseWebP()) document.documentElement.classList.add('webp');

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
            document.documentElement.classList.remove('is-offline');
        }
        function doOffline() {
            // console.log('offline')
            document.documentElement.classList.add('is-offline');
        }
        window.addEventListener('online', doOnline);
        window.addEventListener('offline', doOffline);
        if (navigator.onLine === false) doOffline();

        // 利用 pointer event 判断当前是否为 hover
        if (window.PointerEvent) {
            document.documentElement.classList.add('is-hover');
            document.documentElement.addEventListener('pointerenter', (evt) => {
                if (evt.pointerType === 'mouse' || evt.pointerType === 'pen')
                    document.documentElement.classList.add('is-hover');
                else document.documentElement.classList.remove('is-hover');
            });
            document.documentElement.addEventListener('pointerleave', () => {
                document.documentElement.classList.remove('is-hover');
            });
        } else {
            document.documentElement.addEventListener('mouseenter', () => {
                document.documentElement.classList.add('is-hover');
            });
            document.documentElement.addEventListener('mouseleave', () => {
                document.documentElement.classList.remove('is-hover');
            });
        }

        // document.documentElement = tagHtml
    });

    // 安装 PWA 事件: 如果在 React 渲染前触发
    window.addEventListener(
        'beforeinstallprompt',
        beforeinstallpromptHandlerBeforeReact
    );

    if (__DEV__) console.log('🚨 Complete: critical process!');
};

doCricital();
