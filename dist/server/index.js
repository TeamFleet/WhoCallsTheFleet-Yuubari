/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/[need_set_in_app:__webpack_public_path__]/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(0);

var pathBase = path.resolve(__dirname, '../');
var pathApp = path.resolve(pathBase, './apps/app');

var _require = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    pathNameOutput = _require.pathNameOutput,
    pathNameSub = _require.pathNameSub;

module.exports = {
    base: pathBase,
    assets: path.resolve(pathBase, './assets'),
    pics: path.resolve(pathBase, './pics'),
    bgimgs: path.resolve(pathBase, './node_modules/whocallsthefleet-backgrounds/output'),

    app: pathApp,
    appUI: path.resolve(pathApp, './client/ui'),

    output: path.resolve(pathBase, pathNameOutput, 'public/' + pathNameSub + '/')
};
/* WEBPACK VAR INJECTION */}.call(exports, "config"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 4;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var fs = __webpack_require__(5);
var path = __webpack_require__(0);
var webpack = __webpack_require__(2);
var ExtractTextPlugin = __webpack_require__(3);

var _require = __webpack_require__(1),
    pathBase = _require.base,
    pathAssets = _require.assets,
    pathBgimgs = _require.bgimgs,
    pathApp = _require.app,
    pathAppUI = _require.appUI,
    dirs = _objectWithoutProperties(_require, ['base', 'assets', 'bgimgs', 'app', 'appUI']);

var useSpCssLoader = 'sp-css-loader?length=8&mode=replace';
var useUniversalAliasLoader = {
    loader: "universal-alias-loader",
    options: {
        alias: {
            "~base.less": pathAppUI + '/base.less',
            "~Assets": pathAssets,
            "~/": pathAppUI + '//'
        }
    }
};

module.exports = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isExtractTextPlugin = options.isExtractTextPlugin;


    return {

        entry: {
            critical: [path.resolve(pathApp, './client/critical.js')]
        },

        module: {
            rules: [{
                test: /\.json$/,
                loader: 'json-loader'
            },

            // CSS - general
            {
                test: /\.css$/,
                exclude: [/\.g\.css$/, /node_modules/],
                use: [useSpCssLoader, "postcss-loader", useUniversalAliasLoader]
                // loader: 'sp-css-loader?length=8&mode=replace!postcss-loader'
            }, {
                test: /\.less$/,
                exclude: [/\.g\.less$/, /node_modules/],
                use: [useSpCssLoader, "postcss-loader", "less-loader", useUniversalAliasLoader]
            }, {
                test: /\.scss$/,
                exclude: [/\.g\.scss$/, /node_modules/],
                use: [useSpCssLoader, "postcss-loader", "sass-loader", useUniversalAliasLoader]
            },

            // CSS - in node_modules
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ["style-loader", "postcss-loader"]
            }, {
                test: /\.less$/,
                include: /node_modules/,
                use: ["style-loader", "postcss-loader", "less-loader"]
            }, {
                test: /\.scss$/,
                include: /node_modules/,
                use: ["style-loader", "postcss-loader", "sass-loader"]
            },

            // CSS - critical
            {
                test: isExtractTextPlugin ? /critical\.g\.css$/ : /^IMPOSSIBLE$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader"]
                })
            }, {
                test: isExtractTextPlugin ? /critical\.g\.less$/ : /^IMPOSSIBLE$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "less-loader"]
                })
            }, {
                test: isExtractTextPlugin ? /critical\.g\.scss$/ : /^IMPOSSIBLE$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "sass-loader"]
                })
            },

            // CSS - other global
            {
                test: /\.g\.css$/,
                exclude: isExtractTextPlugin ? /critical\.g\.css$/ : undefined,
                loader: 'style-loader!postcss-loader'
            }, {
                test: /\.g\.less$/,
                exclude: isExtractTextPlugin ? /critical\.g\.less$/ : undefined,
                loader: 'style-loader!postcss-loader!less-loader'
            }, {
                test: /\.g\.scss$/,
                exclude: isExtractTextPlugin ? /critical\.g\.scss$/ : undefined,
                loader: 'style-loader!postcss-loader!sass-loader'
            },

            //

            {
                test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
                exclude: /node_modules/
            }, {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                exclude: /node_modules/
            }, {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            }, {
                test: /\.nedb$/,
                loader: 'raw-loader'
            }, {
                test: /\.md$/,
                include: [/docs/],
                loader: 'raw-loader'
            }]
        },

        plugins: [new webpack.DefinePlugin({
            '__CHANNEL__': JSON.stringify(!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())()),
            '__BGIMG_LIST__': JSON.stringify(fs.readdirSync(pathBgimgs).filter(function (file) {
                return !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg';
            })),
            '__ICONSVG__': JSON.stringify(fs.readFileSync(path.resolve(pathAssets, './symbols/symbol-defs.svg'), 'utf8').replace(/<title>(.+?)<\/title>/g, ''))
        })],

        resolve: {
            alias: {
                // 目录别名，不用的项目可以删除
                '@apps': path.resolve(pathBase, './apps'),

                '@app': pathApp,
                '@appConfig': path.resolve(pathApp, './config'),
                '@appUtils': path.resolve(pathApp, './utils'),
                '@appUI': path.resolve(pathApp, './client/ui'),
                '@appLogic': path.resolve(pathApp, './client/logic'),
                "@appData": path.resolve(pathApp, './data'),

                '@appLocales': path.resolve(pathBase, './locales'),
                '@appAssets': path.resolve(pathBase, './assets'),
                '@appDocs': path.resolve(pathBase, './docs')
            }
        }

    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 处理 es6\es7
__webpack_require__(10);
__webpack_require__(12);

// 加载全局变量
__webpack_require__(13);

// babel 处理入口文件
__webpack_require__(15);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint max-len: 0 */
// TODO: eventually deprecate this console.trace("use the `babel-register` package instead of `babel-core/register`");
module.exports = __webpack_require__(11);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-register");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 前后端同构使用统一的 fetch 数据方式
__webpack_require__(14);

// 告诉配置文件，当前运行环境不是webpack
// /config/apps/ 这里的server属性用到的
global.NOT_WEBPACK_RUN = true;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_super_project_AppContainer__ = __webpack_require__(16);
var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* 
    此文件不建议修改，方便升级
*/



var serverConfig = __webpack_require__(21);
var server = new __WEBPACK_IMPORTED_MODULE_0_super_project_AppContainer__["a" /* AppContainer */]();

/* 公用的koa配置 */

server.app.keys = serverConfig.COOKIE_KEYS;

/* 公用koa中间件 */

__webpack_require__(22)(server)

/* 挂载子应用 */
;(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(server) {
        var appsConfig, appName, config;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return __webpack_require__(25);

                    case 2:
                        appsConfig = _context.sent;

                        for (appName in appsConfig) {
                            config = appsConfig[appName];

                            server.addSubApp(config.domain, config.server); // 、、、、、、、、、、、因为是异步的，server内容可能不全！！！
                        }

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
})()(server);

// const appsConfig = require('../config/apps')
// for (let appName in appsConfig) {
//     let config = appsConfig[appName]
//     console.log(config)
//     server.addSubApp(config.domain, require('../apps/api/index')) 
// }

server.mountSwitchSubAppMiddleware();

/* 系统运行 */

server.run(serverConfig.SERVER_PORT);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AppContainer__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_AppContainer__["a"]; });



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppContainer; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PORT = 3000;
var DEFAULT_DOMAIN = 'localhost';

var AppContainer = function () {
        function AppContainer() {
                _classCallCheck(this, AppContainer);

                // 存放子应用的键值对

                this.subApps = {};

                // 实例化1个 Koa 对象

                this.app = function (Koa) {
                        return new Koa();
                }(__webpack_require__(18));

                // this.mountSwitchSubAppMiddleware()
        }

        /**
         * 挂载子应用，一般是跟进二级域名前缀区分的
         * 二级域名前缀作为key
         * 
         * @param {string} key 
         * @param {object} app 
         * @memberof AppContainer
         */


        _createClass(AppContainer, [{
                key: 'addSubApp',
                value: function addSubApp(domain, app) {

                        if (this.subApps[domain]) {
                                console.warn('This app domain is exist : ' + domain + ' , it will be overwrite.');
                        }

                        console.info('APP [' + domain + '] is mounted \u221A');

                        this.subApps[domain] = app;
                }
        }, {
                key: 'removeSubApp',
                value: function removeSubApp(domain) {
                        this.subApps[domain] = undefined;
                }

                /**
                 * 根据二级域名去执行不同的子 App 逻辑
                 * 
                 * @memberof AppContainer
                 */

        }, {
                key: 'mountSwitchSubAppMiddleware',
                value: function mountSwitchSubAppMiddleware() {
                        var defaultDomain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_DOMAIN;


                        var compose = __webpack_require__(19);
                        var me = this;

                        this.app.use(function () {
                                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
                                        var domain, subApp;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                        switch (_context.prev = _context.next) {
                                                                case 0:
                                                                        domain = ctx.hostname;

                                                                        // 开发模式可以把以IP访问，默认指向 默认配置app

                                                                        if (['localhost', '127.0.0.1'].indexOf(ctx.hostname) > -1) {
                                                                                domain = defaultDomain;
                                                                        }

                                                                        // 把子应用的逻辑部分合并过来

                                                                        if (!(JSON.stringify(me.subApps) === JSON.stringify({}))) {
                                                                                _context.next = 4;
                                                                                break;
                                                                        }

                                                                        return _context.abrupt('return', next());

                                                                case 4:
                                                                        subApp = me.subApps[domain];

                                                                        if (!subApp) {
                                                                                _context.next = 10;
                                                                                break;
                                                                        }

                                                                        _context.next = 8;
                                                                        return compose(subApp.middleware)(ctx);

                                                                case 8:
                                                                        _context.next = 11;
                                                                        break;

                                                                case 10:
                                                                        // ctx.redirect(`${ctx.protocol}://${defaultDomain}.${ctx.host}${ctx.path}${ctx.search}`)
                                                                        ctx.status = 404;

                                                                case 11:
                                                                case 'end':
                                                                        return _context.stop();
                                                        }
                                                }
                                        }, _callee, this);
                                }));

                                return function (_x2, _x3) {
                                        return _ref.apply(this, arguments);
                                };
                        }());
                }
        }, {
                key: 'run',
                value: function run() {
                        var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PORT;

                        var http = __webpack_require__(20);

                        // 

                        var server = http.createServer(this.app.callback());

                        // http 服务监听

                        server.on('error', onError);
                        server.on('listening', onListening);

                        function onError(error) {

                                if (error.syscall !== 'listen') {
                                        throw error;
                                }

                                // handle specific listen errors with friendly messages
                                switch (error.code) {
                                        case 'EACCES':
                                                console.error(port + ' requires elevated privileges !!!');
                                                process.exit(1);
                                                break;
                                        case 'EADDRINUSE':
                                                console.error(port + ' is already in use !!!');
                                                process.exit(1);
                                                break;
                                        default:
                                                throw error;
                                }
                        }

                        function onListening() {
                                console.info('SYSTEM listening on ' + port + ' \u221A ');
                        }

                        //

                        server.listen(port);

                        //

                        this.httpServer = server;
                }
        }]);

        return AppContainer;
}();



/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {

    // cookie serect key
    COOKIE_KEYS: ['super-project-key'],

    // 系统服务启动端口
    SERVER_PORT: Object({"NODE_ENV":"production"}).SERVER_PORT || (Object({"NODE_ENV":"production"}).WEBPACK_BUILD_ENV === 'dev' ? '3000' : '8080')
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 此文件可或者 koa 中间件，所有 app 都会用到
// 扩展时候需考虑普适性

module.exports = function (server) {

    /* 静态目录,用于外界访问打包好的静态文件js、css等 */

    var koaStatic = __webpack_require__(23);
    var convert = __webpack_require__(24);
    var rootPath = process.cwd() + '/dist/public';
    var option = {
        maxage: 0,
        hidden: true,
        index: 'index.html',
        defer: false,
        gzip: true,
        extensions: false
    };
    server.app.use(convert(koaStatic(rootPath, option)));
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("koa-convert");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return __webpack_require__(26);

                case 2:
                    _context.t0 = _context.sent;
                    return _context.abrupt('return', {
                        app: _context.t0
                    });

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, _this);
}))();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = __webpack_require__(0);
var appRunPath = process.cwd();

var pathBase = path.resolve(appRunPath, './apps/app');

module.exports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.t0 = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()).domain;
                    _context2.t1 = global.NOT_WEBPACK_RUN ? !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()).default : '';
                    _context2.next = 4;
                    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        var ENV, STAGE;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        // 描述环境
                                        // dev 开发 | dist 部署
                                        ENV = Object({"NODE_ENV":"production"}).WEBPACK_BUILD_ENV || 'dev';

                                        // 描述场景
                                        // client 客户端 | server 服务端

                                        STAGE = Object({"NODE_ENV":"production"}).WEBPACK_STAGE_MODE || 'client';

                                        if (!(STAGE === 'client' && ENV === 'dist')) {
                                            _context.next = 6;
                                            break;
                                        }

                                        _context.next = 5;
                                        return __webpack_require__(27);

                                    case 5:
                                        return _context.abrupt('return', _context.sent);

                                    case 6:
                                        _context.next = 8;
                                        return __webpack_require__(33);

                                    case 8:
                                        return _context.abrupt('return', _context.sent);

                                    case 9:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this);
                    }))();

                case 4:
                    _context2.t2 = _context2.sent;
                    _context2.t3 = {
                        client: _context2.t2
                    };
                    return _context2.abrupt('return', {
                        domain: _context2.t0,
                        server: _context2.t1,
                        webpack: _context2.t3
                    });

                case 7:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, _this);
}))();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// const fs = require('fs-extra')
var path = __webpack_require__(0);
var webpack = __webpack_require__(2);
var ExtractTextPlugin = __webpack_require__(3);

var _require = __webpack_require__(1),
    pathApp = _require.app,
    pathOutput = _require.output,
    dirs = _objectWithoutProperties(_require, ['app', 'output']);

var _require2 = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    pathNameSub = _require2.pathNameSub;

var publicPath = '/' + pathNameSub + '/';

var pluginCopyImages = __webpack_require__(30);

var config = __webpack_require__(7)({
    isExtractTextPlugin: true
});

module.exports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.t0 = Object;
                    _context.t1 = {};
                    _context.t2 = config;
                    _context.t3 = _extends({}, config.entry, {
                        "critical-extra-old-ie": ["babel-polyfill", path.resolve(pathApp, './client/critical.extra-old-ie.js')],
                        client: [path.resolve(pathApp, './client')]
                    });
                    _context.t4 = {
                        filename: '[name].[chunkhash].js',
                        chunkFilename: 'chunk.[name].[chunkhash].js',
                        path: pathOutput,
                        publicPath: publicPath // TODO 改成静态第三方URL用于CDN部署 http://localhost:3000/
                    };
                    _context.t5 = {
                        'pwa': {
                            outputPath: path.resolve(pathOutput, '../'),
                            outputFilename: 'service-worker.' + pathNameSub + '.js',
                            // customServiceWorkerPath: path.normalize(appPath + '/src/client/custom-service-worker.js'),
                            globPattern: '/' + pathNameSub + '/**/*',
                            globOptions: {
                                ignore: ['/**/_*/', '/**/_*/**/*']
                            },
                            // appendUrls: getUrlsFromRouter()
                            appendUrls: []
                        }
                    };
                    _context.t6 = [];
                    _context.t7 = _toConsumableArray(config.plugins);
                    _context.t8 = [new ExtractTextPlugin('[name].[chunkhash].css'), new webpack.DefinePlugin({
                        '__ELECTRON__': false
                        // '__PUBLIC__': JSON.stringify(publicPath),
                    })];
                    _context.t9 = _toConsumableArray;
                    _context.next = 12;
                    return pluginCopyImages();

                case 12:
                    _context.t10 = _context.sent;
                    _context.t11 = (0, _context.t9)(_context.t10);
                    _context.t12 = _context.t6.concat.call(_context.t6, _context.t7, _context.t8, _context.t11);
                    _context.t13 = ['default', _context.t5, _context.t12];
                    _context.t14 = {
                        entry: _context.t3,
                        output: _context.t4,
                        plugins: _context.t13
                    };
                    return _context.abrupt('return', _context.t0.assign.call(_context.t0, _context.t1, _context.t2, _context.t14));

                case 18:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, _this);
}))();

/***/ }),
/* 28 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 28;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 29;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = __webpack_require__(5);
var path = __webpack_require__(0);
var CopyWebpackPlugin = __webpack_require__(31);

var _require = __webpack_require__(1),
    pathBase = _require.base,
    pathAssets = _require.assets,
    pathPics = _require.pics,
    pathBgimgs = _require.bgimgs,
    pathOutput = _require.output;

var channel = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())();

var pathAssetsLogos = path.resolve(pathAssets, './logos/' + channel + '/');

var os = __webpack_require__(32);
var platform = os.platform();
var isWindows = /^win/.test(platform);
var isMac = /^darwin/.test(platform);

var pluginCopyImages = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(isDev, isSPA) {
        var arr, plugins;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        arr = [];

                        if (!isSPA) {
                            _context.next = 9;
                            break;
                        }

                        arr.push({
                            context: pathBgimgs,
                            from: '**/*.webp',
                            to: '../bgimgs'
                        });
                        arr.push({
                            from: path.resolve(pathBgimgs, './thumbnail'),
                            to: '../bgimgs/thumbnail'
                        });
                        arr.push({
                            from: path.resolve(pathAssetsLogos, 'appicon.ico'),
                            to: 'assets'
                        });
                        arr.push({
                            from: path.resolve(pathAssetsLogos, 'appicon.icns'),
                            to: 'assets'
                        });
                        arr.push({
                            from: path.resolve(pathAssetsLogos, '128.png'),
                            to: 'assets/appicon.png'
                        });
                        _context.next = 19;
                        break;

                    case 9:
                        arr.push({
                            from: pathBgimgs,
                            to: '../bgimgs'
                        });
                        arr.push({
                            from: path.resolve(pathAssets, 'logos/' + channel + '/32.ico'),
                            to: '../favicon.ico'
                        });
                        _context.t0 = arr.push;
                        _context.t1 = arr;
                        _context.t2 = _toConsumableArray;
                        _context.next = 16;
                        return getPics(isDev);

                    case 16:
                        _context.t3 = _context.sent;
                        _context.t4 = (0, _context.t2)(_context.t3);

                        _context.t0.apply.call(_context.t0, _context.t1, _context.t4);

                    case 19:
                        plugins = [new CopyWebpackPlugin(arr)];
                        // switch (type) {
                        //     case 'app': {
                        //         const pathBgimgs = path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output')
                        //         plugins.push(
                        //             new webpack.DefinePlugin({
                        //                 '__BGIMG_LIST__': JSON.stringify(
                        //                     // glob.sync(path.resolve(pathBgimgs, '*.jpg'))
                        //                     fs.readdirSync(pathBgimgs).filter(
                        //                         file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
                        //                     )
                        //                 ),
                        //                 '__ICONSVG__': JSON.stringify(
                        //                     fs.readFileSync(
                        //                         path.resolve(appPath, './src/app/client/assets/symbols/symbol-defs.svg'), 'utf8'
                        //                     ).replace(/<title>(.+?)<\/title>/g, '')
                        //                 )
                        //             })
                        //         )
                        //         break
                        //     }
                        // }

                        return _context.abrupt('return', plugins);

                    case 21:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function pluginCopyImages(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var asyncTest = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return new Promise(function (resolve) {
                            setTimeout(function () {
                                console.log('alalala');
                                resolve([{
                                    from: path.resolve(pathAssets, 'akashi.png')
                                }]);
                            }, 10000);
                        });

                    case 2:
                        return _context2.abrupt('return', _context2.sent);

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function asyncTest() {
        return _ref2.apply(this, arguments);
    };
}();

var getPics = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(isDev) {
        var dirPics, dirTo, dirTarget, results, ships, filelist, getDb, readdir, checkDo, resultAdd, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, type, dirType, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, id, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, ship;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:

                        // TODO: check version to overwrite

                        dirPics = pathPics;
                        dirTo = '../pics';
                        dirTarget = path.resolve(pathOutput, './' + dirTo);
                        results = [];
                        ships = void 0;
                        filelist = {
                            ships: ['0', '0-1', '0-2'],
                            shipsExtra: ['8', '9'],
                            equipments: ['card']
                        };

                        getDb = function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dbname) {
                                var arr;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                arr = [];
                                                _context3.next = 3;
                                                return new Promise(function (resolve, reject) {
                                                    fs.readFile(path.resolve(pathBase, './node_modules/whocallsthefleet-database/db/' + dbname + '.nedb'), 'utf-8', function (err, data) {
                                                        if (err) reject(err);
                                                        data.split(/\r?\n/).forEach(function (item) {
                                                            if (!item) return;
                                                            arr.push(JSON.parse(item));
                                                        });
                                                        resolve();
                                                    });
                                                });

                                            case 3:
                                                return _context3.abrupt('return', arr);

                                            case 4:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this);
                            }));

                            return function getDb(_x4) {
                                return _ref4.apply(this, arguments);
                            };
                        }();

                        readdir = function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dir) {
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                return _context4.abrupt('return', new Promise(function (resolve, reject) {
                                                    fs.readdir(dir, function (err, files) {
                                                        if (err) reject(err);
                                                        resolve(files);
                                                    });
                                                }));

                                            case 1:
                                            case 'end':
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, _this);
                            }));

                            return function readdir(_x5) {
                                return _ref5.apply(this, arguments);
                            };
                        }();

                        checkDo = function () {
                            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(type, id, listBasename) {
                                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;

                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context5.prev = 3;
                                                _context5.next = 6;
                                                return readdir(path.join(dirPics, type, id));

                                            case 6:
                                                _context5.t0 = Symbol.iterator;
                                                _iterator = _context5.sent[_context5.t0]();

                                            case 8:
                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                    _context5.next = 14;
                                                    break;
                                                }

                                                file = _step.value;

                                                if (typeof listBasename === 'undefined' || listBasename.indexOf(path.basename(file, path.extname(file))) > -1) {
                                                    if (!isDev && !fs.existsSync(path.join(dirTarget, type, id, file))) resultAdd(type, id, file);
                                                }

                                            case 11:
                                                _iteratorNormalCompletion = true;
                                                _context5.next = 8;
                                                break;

                                            case 14:
                                                _context5.next = 20;
                                                break;

                                            case 16:
                                                _context5.prev = 16;
                                                _context5.t1 = _context5['catch'](3);
                                                _didIteratorError = true;
                                                _iteratorError = _context5.t1;

                                            case 20:
                                                _context5.prev = 20;
                                                _context5.prev = 21;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 23:
                                                _context5.prev = 23;

                                                if (!_didIteratorError) {
                                                    _context5.next = 26;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 26:
                                                return _context5.finish(23);

                                            case 27:
                                                return _context5.finish(20);

                                            case 28:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, _this, [[3, 16, 20, 28], [21,, 23, 27]]);
                            }));

                            return function checkDo(_x6, _x7, _x8) {
                                return _ref6.apply(this, arguments);
                            };
                        }();

                        resultAdd = function resultAdd(type, id, file) {
                            // console.log(type, id, file)
                            results.push({
                                context: path.resolve(dirPics),
                                from: type + '/' + id + '/' + file,
                                to: dirTo + '/' + type + '/' + id
                            });
                        };

                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context6.prev = 13;
                        _context6.next = 16;
                        return readdir(dirPics);

                    case 16:
                        _context6.t0 = Symbol.iterator;
                        _iterator2 = _context6.sent[_context6.t0]();

                    case 18:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context6.next = 101;
                            break;
                        }

                        type = _step2.value;
                        dirType = path.join(dirPics, type);
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context6.prev = 24;
                        _context6.next = 27;
                        return readdir(dirType);

                    case 27:
                        _context6.t1 = Symbol.iterator;
                        _iterator3 = _context6.sent[_context6.t1]();

                    case 29:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context6.next = 84;
                            break;
                        }

                        id = _step3.value;
                        _context6.t2 = type;
                        _context6.next = _context6.t2 === 'ships' ? 34 : _context6.t2 === 'ships-extra' ? 72 : _context6.t2 === 'equipments' ? 75 : 78;
                        break;

                    case 34:
                        if (ships) {
                            _context6.next = 64;
                            break;
                        }

                        ships = {};
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context6.prev = 39;
                        _context6.next = 42;
                        return getDb('ships');

                    case 42:
                        _context6.t3 = Symbol.iterator;
                        _iterator4 = _context6.sent[_context6.t3]();

                    case 44:
                        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                            _context6.next = 50;
                            break;
                        }

                        ship = _step4.value;

                        ships[ship.id] = ship;

                    case 47:
                        _iteratorNormalCompletion4 = true;
                        _context6.next = 44;
                        break;

                    case 50:
                        _context6.next = 56;
                        break;

                    case 52:
                        _context6.prev = 52;
                        _context6.t4 = _context6['catch'](39);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context6.t4;

                    case 56:
                        _context6.prev = 56;
                        _context6.prev = 57;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 59:
                        _context6.prev = 59;

                        if (!_didIteratorError4) {
                            _context6.next = 62;
                            break;
                        }

                        throw _iteratorError4;

                    case 62:
                        return _context6.finish(59);

                    case 63:
                        return _context6.finish(56);

                    case 64:
                        if (!(ships[id] && ships[id].illust_same_as_prev)) {
                            _context6.next = 69;
                            break;
                        }

                        _context6.next = 67;
                        return checkDo(type, id, filelist.ships);

                    case 67:
                        _context6.next = 71;
                        break;

                    case 69:
                        _context6.next = 71;
                        return checkDo(type, id, [].concat(_toConsumableArray(filelist.ships), ['8', '9', '10']));

                    case 71:
                        return _context6.abrupt('break', 81);

                    case 72:
                        _context6.next = 74;
                        return checkDo(type, id, filelist.shipsExtra);

                    case 74:
                        return _context6.abrupt('break', 81);

                    case 75:
                        _context6.next = 77;
                        return checkDo(type, id, filelist.equipments);

                    case 77:
                        return _context6.abrupt('break', 81);

                    case 78:
                        _context6.next = 80;
                        return checkDo(type, id);

                    case 80:
                        return _context6.abrupt('break', 81);

                    case 81:
                        _iteratorNormalCompletion3 = true;
                        _context6.next = 29;
                        break;

                    case 84:
                        _context6.next = 90;
                        break;

                    case 86:
                        _context6.prev = 86;
                        _context6.t5 = _context6['catch'](24);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context6.t5;

                    case 90:
                        _context6.prev = 90;
                        _context6.prev = 91;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 93:
                        _context6.prev = 93;

                        if (!_didIteratorError3) {
                            _context6.next = 96;
                            break;
                        }

                        throw _iteratorError3;

                    case 96:
                        return _context6.finish(93);

                    case 97:
                        return _context6.finish(90);

                    case 98:
                        _iteratorNormalCompletion2 = true;
                        _context6.next = 18;
                        break;

                    case 101:
                        _context6.next = 107;
                        break;

                    case 103:
                        _context6.prev = 103;
                        _context6.t6 = _context6['catch'](13);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context6.t6;

                    case 107:
                        _context6.prev = 107;
                        _context6.prev = 108;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 110:
                        _context6.prev = 110;

                        if (!_didIteratorError2) {
                            _context6.next = 113;
                            break;
                        }

                        throw _iteratorError2;

                    case 113:
                        return _context6.finish(110);

                    case 114:
                        return _context6.finish(107);

                    case 115:
                        return _context6.abrupt('return', results);

                    case 116:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this, [[13, 103, 107, 115], [24, 86, 90, 98], [39, 52, 56, 64], [57,, 59, 63], [91,, 93, 97], [108,, 110, 114]]);
    }));

    return function getPics(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

module.exports = pluginCopyImages;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("copy-webpack-plugin");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// const fs = require('fs-extra')
var path = __webpack_require__(0);
var webpack = __webpack_require__(2);
var ExtractTextPlugin = __webpack_require__(3);

var _require = __webpack_require__(1),
    pathBase = _require.base,
    pathApp = _require.app,
    dirs = _objectWithoutProperties(_require, ['base', 'app']);

var _require2 = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    pathNameOutput = _require2.pathNameOutput;

var config = __webpack_require__(7)({
    isExtractTextPlugin: true
});

module.exports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.abrupt('return', Object.assign({}, config, {

                        output: {
                            filename: 'index.js',
                            chunkFilename: 'chunk.[name].[chunkhash].js',
                            path: pathBase + '/' + pathNameOutput + '/server',
                            publicPath: '/[need_set_in_app:__webpack_public_path__]/'
                        },

                        plugins: ['default', [].concat(_toConsumableArray(config.plugins), [new webpack.DefinePlugin({
                            '__ELECTRON__': false
                        })])]

                    }));

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, _this);
}))();

/***/ }),
/* 34 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 34;

/***/ })
/******/ ]);