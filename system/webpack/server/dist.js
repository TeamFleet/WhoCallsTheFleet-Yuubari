const common = require('../common')
const factoryConfig = async(opt) => {

    let { RUN_PATH, CLIENT_DEV_PORT, APP_KEY } = opt

    return {
        target: 'async-node',
        node: {
            __dirname: true
        },
        watch: false,
        entry: common.serverEntries(RUN_PATH),
        output: {
            filename: 'index.js',
            chunkFilename: 'chunk.[name].[chunkhash].js',
            path: `${RUN_PATH}/${common.outputPath}/server`,
            publicPath: `/[need_set_in_app:__webpack_public_path__]/`
        },
        module: {
            rules: [...common.rules]
        },
        plugins: [],
        externals: common.filterExternalsModules(),
        resolve: common.resolve
    }
}

module.exports = async(opt) => await factoryConfig(opt)