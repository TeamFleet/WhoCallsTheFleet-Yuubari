const path = require('path');
const webpack = require('webpack');

/**
 * 生成 Webpack 基础配置
 *
 * 注: 该配置对象会被 Koot.js 封装，自动添加必要的入口、Loader、插件等配置
 *
 * @returns {Promise<Object>}
 */
module.exports = async () => {
    const root = path.resolve(__dirname, '../');

    const config = {
        entry: ['critical', 'polyfill'].reduce((result, entry) => {
            result[entry] = path.resolve(root, `src/${entry}.js`);
            return result;
        }, {}),

        module: {
            rules: [
                {
                    test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 1 * 1024, // 2kb
                        },
                    },
                    // exclude: /node_modules/
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(nedb|json-compressed)$/,
                    loader: 'raw-loader',
                },
                {
                    test: /\.md$/,
                    include: [/docs/],
                    loader: 'raw-loader',
                },
            ],
        },

        plugins: [
            new webpack.NormalModuleReplacementPlugin(
                /^__FLEET_INIT_DATABASE_ONLY_CLIENT__$/,
                process.env.WEBPACK_BUILD_STAGE === 'client'
                    ? path.resolve(root, 'src/database/init-db.js')
                    : path.resolve(root, 'src/database/init-db-fake.js')
            ),
            new webpack.NormalModuleReplacementPlugin(
                /^__FLEET_INIT_DATABASE_ONLY_SERVER__$/,
                process.env.WEBPACK_BUILD_STAGE === 'server'
                    ? path.resolve(root, 'src/database/init-db.js')
                    : path.resolve(root, 'src/database/init-db-fake.js')
            ),
            new webpack.NormalModuleReplacementPlugin(
                /^__FLEET_GET_NEDB__$/,
                path.resolve(
                    root,
                    `src/database/get-nedb-${process.env.WEBPACK_BUILD_STAGE}.js`
                )
            ),
        ],

        resolve: {
            fallback: {
                util: require.resolve('util/'),
                path: require.resolve('path-browserify'),
            },
        },
    };

    if (
        process.env.WEBPACK_BUILD_ENV === 'prod' &&
        process.env.WEBPACK_BUILD_STAGE === 'server'
    ) {
        if (typeof config.externals !== 'object') config.externals = {};
        config.externals['any-promise'] = 'commonjs any-promise';
    }

    return config;
};
