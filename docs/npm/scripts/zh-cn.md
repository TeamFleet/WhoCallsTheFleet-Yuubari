## NPM 脚本

本项目提供以下 NPM 脚本以供快捷使用。

#### 启动项目

`npm start` - 打包代码并启动服务器侦听3000端口，启动后可用 `http://localhost:3000` 访问。

#### 启动项目（开发模式）

`npm run start:dev` - 开启所有开发使用的服务，启动后可用 `http://localhost:3000` 访问。

该脚本会以 PM2 启动服务，需要在全局安装 `pm2` (`npm install -g pm2`)。

#### 启动项目（PM2任务）

`npm run start:pm2` - 效果同 `npm start`，不过会以 PM2 任务模式执行。

#### 仅打包

`npm run build`

#### 重新部署项目

`npm run deploy` - 会执行以下流程

1. 以当前目录为 GIT 代码库执行 `git pull` 获取最新代码
2. 执行 `npm install` 安装依赖
3. 执行 `npm run build` 进行打包
4. 启动/重启当前项目的 PM2 进程

#### PM2任务配置

`/pm2.json` 中存有所有 PM2 任务的配置。