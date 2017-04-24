## 基础理念

*Super-Project* 是基于 React 的客户端与服务器端同构开发框架，这就要求同一套 Javascript 代码需要同时针对客户端（浏览器）环境和服务器端环境，在开发时需格外注意。

如果有单独针对客户端（浏览器）环境或服务器端的需要，可使用全局变量 `__CLIENT__` 或 `__SERVER__` 来检查当前是否处于对应的环境下，具体用法请参见[全局变量](/development/globals)章节。

### 快速上手

请参见[快速上手指南](/development/quickstart)章节了解如何利用 *Super-Project* 框架快速上手开发。

> 你只需要告诉我去哪里杀几只就好了……

### 重要目录与文件

```
src/
 ├── html.js                        * HTML基础模板
 │
 ├── client/                        * 客户端（浏览器）UI渲染与运行时代码
 │   ├── index.js                   * 浏览器执行的代码以及服务器渲染页面时执行的代码，包括 redux reducer 定义、react-router 载入、多语言初始化等
 │   │
 │   ├── assets/                    * 静态资源
 │   ├── config/                    * 项目配置，通常包括：站点名、可用的多语言ID等
 │   │   ├── site.js
 │   │   ├── i18n.js
 │   │   └── [xxx.js]
 │   ├── redux/
 │   │   └── action-types.js        * redux 动作类型定义
 │   ├── router/                    * react-router 路由定义
 │   └── ui/                        * react UI 组件
 │
 ├── features/                      * 支持热插拔的功能模块
 │
 ├── locales/                       * 语言包
 │   ├── zh-cn.json
 │   ├── en.json
 │   └── [xx-oo.json]
 │
 ├── server/                        * 服务器运行时代码
 │   └── index.js                   * 服务器启动时执行的代码，包括 router 挂载、HTML 模板定义等
 │
 └── utils/                         * Javascript功能代码/库

public/                             * 公共资源文件，打包时会自动复制到对应的打包目录中

webpack/                            * Webpack 相关配置
 └── enter.js                       * 配置入口

dist/                               * Webpack 打包结果目录
```

### Webpack

*Super-Project* 使用 Webpack 同时打包客户端与服务器端代码的编译、打包。Webpack 相关配置存放于 `/webpack` 目录下，`enter.js` 为使用 Webpack 时的入口文件，会根据当前的环境、参数返回对应版本的配置信息 JSON。

##### 静态文件

处理静态文件有2种方案：

1. 将静态文件放在 `/public` 中，在执行打包操作时，该目录下的所有文件会被自动复制到打包结果目录中。
2. 使用 Webpack 在打包时将这些文件自动复制到分发结果目录中。在默认的 Webpack 配置结构下，只需要在 `client.dist.js` 中添加复制静态文件的相关功能即可。本例中使用 `copy-webpack-plugin` 从 `/src/client/assets` 中复制 `favicon` 到 web 环境的根目录。

**注:** `client.dist.js` 中指定的根目录为 `/dist/public/client`，而可访问的 web 环境根目录为 `/dist/public`。

### 项目配置

项目的综合配置内容统一存储在 `/src/config` 中，在开发项目逻辑时可以调用这里的内容。本例中配置了站点综合信息 `site.js`、支持的多语言语种 `i18n.js`、MongoDB `mongodb.js` 等。

##### 服务器启动时

在服务器启动时，会执行 `/src/server/index.js` 中的代码，所有需要针对项目进行配置的内容都放在了该文件的顶端。这些配置通常无需调整。

* `distPathName`: 打包结果目标目录，默认使用 `/dist` 目录
* `isomorphicOptions`: 同构相关配置
  * `routes`: react-router 配置对象
  * `configStore`: redux store 对象
  * `template`: HTML基础模板,
  * `distPathName`: 打包结果目标目录
  * `injection`: 对HTML基础模板的自定义注入的方法。如果项目使用的 HTML 基础模板中存在 `&lt;script&gt;//inject_critical&lt;/script&gt;` 这样类似的代码，需要在这里配置替换方法，如本例中的 `critical`。具体用法请参见[HTML模板](/development/html)章节。

##### 渲染时

无论是服务器还是客户端（浏览器）环境，在初次渲染时都会执行 `/src/client/index.js` 中的代码。

所谓“初次渲染”指的是第一次渲染结果。对于服务器环境，指的是在服务器接受HTTP请求之后、处理生成HTML结果之前。对于客户端（浏览器）环境，指的是浏览器首次渲染DOM之前。

渲染时代码将会在其他所有代码之前执行，包括React渲染之前，所以可以在这里放入诸多初始化流程，包括：

* react-router 和 react-redux 的定义、初始化
* 多语言的初始化

### 启动服务器

使用 `npm start` 命令即可开启服务器，而后使用 `localhost:3000` 即可访问。

如果在开发时需要实时更新打包结果，运行 `npm run start:dev`，该命令需要在全局安装 `pm2`。

具体用法请参见[NPM脚本](/npm/scripts)章节。

### CSS

*Super-Project* 原则上支持任何 CSS 开发方式，仅要求最终可以返回标准的 CSS 结果，如加载了对应 Webpack loader 时的 SASS 或 LESS。具体用法请参见[CSS](/development/css)章节。本例中使用 LESS 进行开发。

### 多语言开发
*Super-Project* 支持多语言开发。为了便于语言包的管理，我们建议将对应语种下的所有内容放入单一文件中，在服务器渲染时读取对应语言包的内容，存入 Redux store 中供客户端使用。具体用法请参见[多语言](/development/i18n)章节。

### 模板加载数据

在很多项目开发案例中，我们需要利用同一个模板根据URL请求去获取对应的数据最后渲染出对应的结果。*Super-Project* 支持这一方式的同构，具体用法请参见[模板加载数据](/development/datatemplate)章节。