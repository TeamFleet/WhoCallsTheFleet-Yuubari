const path = require('path');
const webpack = require('webpack');
const webpackOptimizationProd = require('koot/utils/webpack-optimization-prod');

module.exports = async () => {
    /** @type {Object} 基础配置 */
    const configBase = {
        entry: {
            critical: [path.resolve(__dirname, '../../src/critical.js')],
            polyfill: [
                '@babel/polyfill',
                path.resolve(__dirname, '../../src/polyfill.js')
            ]
        },

        module: {
            rules: [
                {
                    test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                    loader:
                        'file-loader?context=static&name=assets/[hash:32].[ext]',
                    exclude: /node_modules/
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.nedb$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.md$/,
                    include: [/docs/],
                    loader: 'raw-loader'
                }
            ]
        },

        plugins: [
            new webpack.NormalModuleReplacementPlugin(
                /^__FLEET_INIT_DATABASE_ONLY_CLIENT__$/,
                process.env.WEBPACK_BUILD_STAGE === 'client'
                    ? path.resolve(__dirname, '../../src/database/init-db.js')
                    : path.resolve(
                          __dirname,
                          '../../src/database/init-db-fake.js'
                      )
            ),
            new webpack.NormalModuleReplacementPlugin(
                /^__FLEET_INIT_DATABASE_ONLY_SERVER__$/,
                process.env.WEBPACK_BUILD_STAGE === 'server'
                    ? path.resolve(__dirname, '../../src/database/init-db.js')
                    : path.resolve(
                          __dirname,
                          '../../src/database/init-db-fake.js'
                      )
            ),
            new webpack.NormalModuleReplacementPlugin(
                /^__FLEET_GET_NEDB__$/,
                path.resolve(
                    __dirname,
                    `../../src/database/get-nedb-${process.env.WEBPACK_BUILD_STAGE}.js`
                )
            )
        ]
    };

    // 针对：开发环境
    if (process.env.WEBPACK_BUILD_ENV === 'dev')
        return {
            ...configBase
        };

    // 针对：生产环境
    // `entry` 项仅针对：客户端
    return {
        ...configBase,
        optimization: webpackOptimizationProd()
    };
};
