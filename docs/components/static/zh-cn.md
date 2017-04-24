## 静态方法

在 React 组件中可以编写一些特定的静态方法函数，这些函数会在服务器渲染时执行。

**注:** 客户端（浏览器）环境不会执行这些函数。

#### preprocess

`static preprocess(state, dispatch)`

在组件渲染之前会*首先*执行这一方法函数。通常来说，异步的为组件获取数据并存储到 Redux 中的方法要写在这一静态方法中，详见[开发 - 模板加载数据](/development/datatemplate)章节。

该函数要求返回 Array，每一个项目需要为 Promise 或形式为 `function(dispatch) { return Promise }` 的 Function。

参数

* `state` 当前的 Redux store
* `dispatch` Redux dispatch 方法函数

```js
// 示例
static preprocess(state, dispatch) {
    return [
        new Promise(function(resolve, reject) {
            someApi.getContentToRedux(state, dispatch)
        }),
        dispatch(someApi.getAnotherContentToRedux(state))
    ]
}
```

```js
const getAnotherContentToRedux = (state) => {
    let promise = new Promise(function(resolve, reject) {
            // AJAX get data
            resolve(data)
        })

    return (dispatch) => promise
        .then(data => {
            return dispatch({
                type: DOC_GET_CONTENT,
                content: data
            })
        }).catch(function (error) {
            dispatch({
                type: DOC_GET_CONTENT,
                content: 'ERROR'
            })
        })
}
```

#### htmlExtends

`static htmlExtends(ext, store)`

该方法会在 `preprocess()` 之后执行，为 HTML 决定网页标题（title）和 `<meta>` 内容。

**注:** 如果使用 `sp-ui-pagecontainer` 的 `PageContainer`，在客户端渲染时也会自动执行这一静态方法，以确保网页标题和 `<meta>` 内容能够自动更新。

该函无需返回值。需要在函数内定义 `ext.meta` 和 `ext.title`

* `ext.meta` Array，每个项目均为 `<meta>` 标签的属性和值的对应 Object，例
    * `{ itemprop: 'name', content: title }`
    * `{ property: 'og:type', content: 'website' }`
* `ext.title` String，当前网页标题

参数

* `ext` 需要定义内容的 Object
* `store` Redux store。**注:** 并非当前 state，而是整个 store 对象

```js
// 示例
static htmlExtends(ext, store) {
    const state = store.getState()
    ext.meta = [
        { property: 'og:type', content: state.title }
    ]
    ext.title = state.title
}
```