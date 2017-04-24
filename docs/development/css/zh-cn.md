## CSS

默认 Webpack 配置下，*Super-Project* 使用 **sp-css-loader** 对 CSS 做了一次最终转换，在最外包裹了一层随机字符串的 class 名称，如

```CSS
.some-class {
    color: red;
}
```

会通过 **sp-css-loader** 转换成

```CSS
.xxoo123 .some-class {
    color: red;
}
```

由于 class 名称的变化，React 组件中需要做出调整：使用 **sp-css-import** 中提供的装饰器函数 `ImportStyle(styles)` 处理引用的样式表文件，此时组件中的 `props.className` 也会被转换为生成的随机字符串 class 名称，示例代码：

```jsx
import React from 'react'
import { ImportStyle } from 'sp-css-import'
import styles from './SomeComponent.css'

@ImportStyle(styles)
class SomeComponent extends React.Component {
    render() {
        return <div className={this.props.className}>SomeComponent</div>
    }
}
```

其中 `./SomeComponent.css` 为该组件的 CSS 样式文件。

##### CSS pre-processor (LESS/SASS等)

对于支持编写样式叠层的 CSS pre-processor，如 LESS 或 SASS，我们建议编写时在最外包裹一层 `.component`，如

```less
.component{
    .some-class{
        color: red;
        @media all and (max-width: 640px){
            color: blue;
        }
    }
}
```

`.component` 会在编译时自动处理为 `.xxoo123` 这样的随机字符串。

默认的 Webpack 配置中已经对 LESS 和 SASS 做了配置。对于其他 CSS pre-processor，只要能够通过加载对应的 loader 在 `import` 或 `require` 后得到最终的结果字符串，也可以采用这样的方式编写。

#### 为什么这样做？

在 React 开发中，我们通常会遇到以下的 CSS 相关的问题：

1. 如果 CSS 代码是在编写 React 组件时载入的（如上面的React组件示例），在同构后，用户第一次浏览该页面时，由于当前 Webpack 的机制，加载的 CSS 代码会在 HTML 渲染后才会进行处理，这会造成不必要的页面结构变化（如闪烁、瞬间的错位等）问题。

   针对这一问题，可以考虑在客户端（浏览器）第一次渲染时添加顶层的 loading 蒙板，在 React 渲染后将 loading 隐藏。但这样的方案会让用户的浏览体验滞后。


2. 组件化的 Javascript 开发方式基本解决了命名空间（namespace）问题，但 CSS 则一直没有解决，对于大型的多人参与开发的项目很容易出现 CSS 重名的情况。

   针对这一问题，可以考虑使用内联 CSS 开发方式，但这会打破既定的 CSS 编写习惯，部分 CSS 也无法通过内联方式进行编写。

**sp-css-loader** 和 **sp-css-import** 就是为了解决这些问题而出现。

#### 不需要这样的转换

很多场合下我们不需要这样的 CSS 转换，如全局 CSS 等。可以通过编写 Webpack 配置来实现区别需要和不需要转换的 CSS。

默认的 Webpack 配置中，凡是以 `.g.css` `.g.less` 或 `.g.scss` 结尾的文件均不会进行转换。