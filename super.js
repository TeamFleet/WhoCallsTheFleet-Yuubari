module.exports = async () => ({
    // String，项目类型，无默认值，必须指定。目前支持 'react'。计划支持 'react-config' 'vue'
    type: 'react',

    // Boolean，是否为同构，默认为 false
    isomorphic: true,

    // String，项目源码根目录，无默认值，必须指定。可为绝对路径或相对于项目根目录的相对路径
    path: '/src/app1',

    // String，HTML基础模板，无默认值，必须指定。
    template: require('/src/app1/template'),

    // Object，路由配置，无默认值，同构时必须指定
    router: require('/src/app1/router'),

    // Object，Redux配置，无默认值，React同构时必须指定
    redux: {
        // 附加 reducer，与 combineReducers 参数语法相同
        combineReducers: {
            infos: require('/src/app1/redux/infos/reducer'),
            user: require('/src/app1/redux/user/reducer'),
        }
    },

    // Array，多语言配置，无默认值
    // 第一个语言为默认语言
    locales: [
        ['en', require('/src/app1/locales/en.json')],
        ['zh-cn', require('/src/app1/locales/zh-cn.json')],
        ['zh', require('/src/app1/locales/zh.json')],
    ],

    // Function || Object，客户端启动代码或配置，可不指定
    // client: require('/src/app1/client'), // 替代默认的客户端启动流程
    client: { // 扩展默认的启动流程
        // String，路由历史类型，支持 'browser' 'hash' 'memory'，同构时默认为 'browser'，其他情况默认为 'hash'
        history: 'browser',
        // Function，在启动前的回调
        beforeRun: require('/src/app1/client/before-run'),
        // Function，在启动后的回调
        afterRun: require('/src/app1/client/after-run'),
        // Function，在路由发生改变时的回调
        onRouterUpdate: require('/src/app1/client/on-router-update'),
        // Function，在浏览器历史发生改变时的回调
        onHistoryUpdate: require('/src/app1/client/on-history-update'),
    },

    // Function || Object，服务器端启动代码或配置，可不指定，非同构时忽略该配置
    // server: require('/src/app1/server'), // 替代默认的服务器端启动流程
    server: { // 扩展默认的启动流程
        // String || Number，服务器启动端口
        port: '3000',
        // Function，Koa App
        app: require('/src/app1/server/app'),
        // String，服务器侦听的域名，多项目同构时必须提供
        domain: 'web.com',
        // Object，注入内容
        inject: {
            critical_css: (() => __DEV__
                ? ''
                : `<style type="text/css">${getFileContent('critical.css')}</style>`
            )(),
        },
        // Function，在启动前的回调
        beforeRun: require('/src/app1/server/before-run'),
        // Function，在启动后的回调
        afterRun: require('/src/app1/server/after-run'),
        // Function，在渲染时的回调
        onRender: require('/src/app1/server/on-render'),
    },

    // Object，扩展默认webpack配置，参见下文
    // webpack: {} // 非同构时，只需要配置client模式
    webpack: {
        client: {},
        server: {},
    },

    // Object，PWA相关配置，参见下文
    pwa: {},
})
