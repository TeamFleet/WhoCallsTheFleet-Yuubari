const path = require('path');
const webpack = require('webpack');

module.exports = async () => {
    const config = {
        entry: ['critical', 'polyfill'].reduce((result, entry) => {
            result[entry] = path.resolve(__dirname, `../../src/${entry}.js`);
            return result;
        }, {}),

        module: {
            rules: [
                {
                    test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1 * 1024,
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
            ),
        ],
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
