## 多语言

*Super Project* 支持多语言开发，相关函数、方法、流程均位于 `sp-i18n` 组件中。

#### 语言包与客户端语言判断

语言包为标准格式的 `json` 文件，存放于 `/src/locales/` 中。

要使用语言包需要申明。在 `/src/client/config/i18n.js` 中修改 Array `availableLocales`，列出项目所有支持的语言。每一条项目的名称需要与语言包文件对应，只需要提供文件名，不需要扩展名，比如本例中

```js
const availableLocales = [
    'zh-cn',
    'en'
]
```

语言包名支持以下写法

* 语言-地区，如 `zh-CN` `ja-JP`
* 仅语言，如 `zh` `en`
* 支持 `-` 与 `_`
* 支持任意大小写组合

语言包申明存在**顺序**，我们会依据 Array 中的顺序进行优先匹配。以下是客户端浏览器语言与本例中的语言包申明的匹配结果

* `zh-CN,zh;q=0.8,en;q=0.6` -> `zh-cn`
* `en-US,en-GB,zh-CN,zh;q=0.6` -> `en`
* `ja,en;q=0.8,zh-CN;q=0.6,zh;q=0.4` -> `en`

本例项目语言包申明中的 `availableLocalesFb` 为针对 Facebook 抓取机器人的语言配置。

#### 翻译函数

`sp-i18n` 默认输出翻译函数 `translate(key[, replacedPair])`，该函数会返回翻译结果，如果提供的 `key` 在语言包中不存在，则直接返回 `key` 的值。

`key` 支持对象层级，如 `translate('nav.about')`。

`replacedPair` 为可选参数，如果需要动态内容支持可提供。同时语言包中的 `${key}` 会被替换为 `replacedPair[key]` 的内容。如下例

```json
// 语言包
{
    "welcome": {
        "currenttime" : "欢迎！当前时间：${time}"
    }
}
```

```jsx
// React 组件
import React from 'react'
import translate from 'sp-i18n'

export default class extends React.Component {
    render() {
        return (
            <div>
                {translate('welcome.currenttime', {
                    time: new Date()
                })}
            </div>
        )
    }
}
```

#### 强制切换语言

如果需要强制切换语言，如本例中左侧导航底部的语言切换功能，只需在 URL 中加入 search (?) 参数 hl=[语言包名] 即可，如 `http://website.com/somepage?hl=en`。

#### 行为原理

服务器渲染时，载入所有语言包的数据到内存，输出当前匹配的语言包名和语言包内容到 Redux。（`/src/client/index.js` 中的代码）

客户端初次渲染时，根据 Redux 中的语言包相关匹配结果进行必要的初始化操作。（`/src/client/index.js` 中的代码）

具体的分析、操作等流程可查阅 `sp-i18n` 组件。

#### 未来的优化空间

* 强制切换语言后保存语言选择。<br>
   现在在切换语言后，在用户下次访问或主动刷新页面后，语言会重置到自动匹配的结果。

* 重写语言包读取方式，不输出到 Redux。<br>
   对于大型项目，语言包的体积会难以控制，在服务器渲染时输出到 Redux 会造成第一次传输HTML的代码体积偏大。