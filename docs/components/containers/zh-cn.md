## 容器&高阶组件

*Super Project* 提供以下容器组件、高阶组件以供使用。

#### PageContainer

本组件位于 `sp-ui-pagecontainer` 模组，可使用以下代码引用到项目中 `import PageContainer from "sp-ui-pagecontainer"`。

本组件为容器组件，在需要时可以包裹在要处理的组件的外层。本组件主要处理页面内容的“载入中”“出错”等状态。

```jsx
// 使用示例

export default class extends React.Component {
    render() {
        return (
            <PageContainer
                className="component-classname"
                id="component-id"

                isLoading={this.props.isLoading}
                isError={this.props.isError}
                isReady={this.props.isReady}

                render={(container) => {
                    if (__CLIENT__) console.log(`PageContainer rendering - status ${container.props.isLoading ? 'LOADING' : 'READY'}`)
                }}
            >
                content...
            </PageContainer>
        )
    }
}
```

参数（所有参数均为可选）

* `{*string} className` 为该 PageContainer 提供自定的 class 名
* `{*string} id` 为该 PageContainer 提供自定的 id
* `{*boolean} isLoading` - 若为 `true`，表示内容正在读取中，此时不会输出既定的内容，而是会输出 `<div className="loading" id={this.props.id}>Loading...</div>`，可根据这一内容制定载入中的样式
* `{*boolean} isReady` - 若为 `true`，PageContainer 会添加 `is-ready` class
* `{*boolean} isError` - 若为 `true`，PageContainer 会添加 `is-error` class
* `{*function} render(container)` - 在 PageContainer 渲染时会执行这一方法，会传输 PageContainer 的实例为参数，可通过 container.props 来获取 PageContainer 的当前属性