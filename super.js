import path from 'path'

// String，项目标识名
export const name = 'theFleet'

// String，项目类型
// 无默认值，必须指定
// 目前支持 'react'
// 计划支持 'react-config' 'vue'
export const type = 'react'

// Boolean，是否为同构，默认为 false
// export const isomorphic = true

// String，项目源码根目录
// 无默认值，必须指定
// export const dir = path.resolve(__dirname, './src/')

// String，HTML基础模板
// 无默认值，必须指定
// 同构模式、客户端环境：忽略
export const template = (() => {
    if (__SERVER__) return require('./src/html').default
    if (__SPA__) return require('./src/html').default
    return ''
})()

// Object，路由配置
// 无默认值
// 同构模式：必须指定
export const router = require('./src/router').default

// Object，Redux配置
// 无默认值
// 同构模式：必须指定
export const redux = {
    // 附加 reducer，与 combineReducers 参数语法相同
    combineReducers: require('./src/redux/reducers').default
}

// Function || Object，客户端启动代码或配置
// 可不指定
// export const client = require('/src/app1/client'), // 替代默认的客户端启动流程
export const client = { // 扩展默认的启动流程
    // String，路由历史类型，支持 'browser' 'hash' 'memory'，同构时默认为 'browser'，其他情况默认为 'hash'
    history: 'browser',
    // Function，在启动前的回调
    before: require('./src/super/client/before').default,
    // Function，在启动后的回调
    after: require('./src/super/client/after').default,
    // Function，在路由发生改变时的回调
    onRouterUpdate: require('./src/super/client/on-router-update').default,
    // Function，在浏览器历史发生改变时的回调
    onHistoryUpdate: require('./src/super/client/on-history-update').default,
}

// Function || Object，服务器端启动代码或配置
// 可不指定
// 非同构模式：忽略
// 客户端环境：忽略
// export const server = require('/src/app1/server'), // 替代默认的服务器端启动流程
export const server = __SERVER__ ? { // 扩展默认的启动流程
    // Array，Cookie键值
    cookieKeys: ['super-project-key'],
    // Function，Koa App
    // app: './super/server/app',
    koaStatic: {
        maxage: 0,
        hidden: true,
        index: 'index.html',
        defer: false,
        gzip: true,
        extensions: false
    },
    // Object，服务器专用的附加 Reducer，与 combineReducers 参数语法相同
    // reducers: {},
    // Object，注入内容
    inject: require('./src/super/server/inject').default,
    // Function，在启动前的回调
    before: require('./src/super/server/before').default,
    // Function，在启动后的回调
    after: require('./src/super/server/after').default,
    // Function，在渲染时的回调
    onRender: require('./src/super/server/on-render').default,
} : {}
