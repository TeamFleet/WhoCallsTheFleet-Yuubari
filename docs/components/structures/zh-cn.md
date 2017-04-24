## 组件结构

原则上不对 React 组件文件的存储结构做要求。下面仅为建议。

#### 建议的目录结构

```
src/client/
 ├── critical.js                    * 优先于 React 渲染前执行的代码
 ├── critical.g.less                * 全局 CSS
 │
 └── ui/                            * React 组件
     ├── App.jsx                    * react-router 最底层（基础）的组件
     │
     ├── base/                      * 基础组件内容、样式等
     ├── components/                * UI 组件，如按钮、标题等
     ├── containers/                * 容器组件与高阶组件
     ├── layout/                    * 布局组件
     └── pages/                     * 页面所用的具体组件
```

#### 建议的组件树结构

```
App/Root
 ├── Nav
 ├── Main
 │   └── PageContainer
 └── Footer
```