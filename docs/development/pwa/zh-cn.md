## PWA

*PWA (Progressive Web App)* 是一项让 Web 网页变得更像本地 App 的技术，其核心是利用 *Service Worker* 管理请求和缓存。

*Super Project* 提供的 `sp-pwa` NPM包支持最基本的缓存管理。

#### 启用 PWA 支持

启用 PWA 前，需要满足以下条件：

1. **网站支持 HTTPS 加密连接**
2. HTTPS 加密连接的证书由 Google 认证的权威机构颁发

满足该条件的情况下，按以下步骤即可利用 `sp-pwa` 自动管理缓存。

1. 添加注入，目前有2个方案，可选其一。在 HTML 模板 `/src/html.js` 的 `<head>` 内添加：
    * `&lt;script&gt;//inject_pwa&lt;/script&gt;` - 该注入会采用 `sp-pwa` 默认提供的 Service Worker 载入策略
    * `&lt;script&gt;//inject_pwa_filename&lt;/script&gt;` - 该注入会输出 Service Worker 文件地址，可用该地址自行编写载入策略
2. 按以下步骤为添加 Webpack 插件
    1. 在 `/webpack/client.dist.js` 中加入模组引用 `const pwaCreatePlugin = require('sp-pwa')`
    2. 在 `plugins` ARRAY 中加入 `pwaCreatePlugin(outputPath[, serviceWorkerJsFilePath])`

#### pwaCreatePlugin(outputPath[, serviceWorkerJsFilePath])

###### outputPath

代码打包目标目录，也即 Webpack 配置中的 `output.path`

###### serviceWorkerJsFilePath

可选。自指定 Service Worker Javascript 文件的地址。指定后会采用该 JS 文件，而非 `sp-pwa` 默认提供。

本过程还会自动将 Service Worker 文件中的 `urlsToCache = []` 的内容填充为打包目录下的所有文件列表。