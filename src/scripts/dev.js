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
    const { open } = await inquirer.prompt({
        type: 'confirm',
        name: 'open',
        message: '是否自动打开浏览器并访问首页？',
        default: true
    });
    console.log('🔜 Koot.js 开发环境启动中...');
    const cmd = `koot-dev` + (open ? `` : ` --no-open`);
    await runScript(cmd);
})();
