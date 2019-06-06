const inquirer = require('inquirer');

/**
 * 通过 _spawn_ 方式执行指定命令，正常输出所有日志信息
 * @async
 * @param {String} cmd 命令内容
 */
const runScript = async cmd => {
    const chunks = cmd.split(' ');
    await new Promise(resolve => {
        const child = require('child_process').spawn(chunks.shift(), chunks, {
            stdio: 'inherit',
            shell: true
        });
        child.on('close', () => {
            resolve();
        });
    });
};

(async () => {
    const { arg } = await inquirer.prompt({
        type: 'list',
        name: 'arg',
        message: '选择开发环境模式',
        default: 0,
        choices: [
            new inquirer.Separator(),
            {
                name: '完整开发环境',
                value: '',
                short: '完整'
            },
            {
                name: '完整开发环境 (不自动打开页面)',
                value: '--no-open',
                short: '完整 (不自动打开页面)'
            },
            new inquirer.Separator(),
            {
                name: '仅启动客户端开发服务器',
                value: '-c',
                short: '仅客户端'
            },
            {
                name: '仅启动服务器端开发服务器',
                value: '-s',
                short: '仅服务器端'
            }
        ]
    });
    console.log('💥 Koot.js 开发环境启动中...');
    const cmd = `koot-dev` + (arg ? ` ${arg}` : '');
    await runScript(cmd);
})();
