# dsh-docker

[English](README.en.md)

![dsh-docker 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/assets/cover-whale-girl.png)

在 DSH 中查看和管理本机 Docker 容器与镜像。

[![npm](https://img.shields.io/npm/v/@stardustlc/dsh-docker)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-docker/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-docker/pulls)。

## 功能

- 查看容器、镜像、日志和资源状态。
- 运行容器内命令，执行常用管理操作。
- 执行和破坏性操作遵循宿主审批。

## 安装

桌面版可在「插件」面板按包名 `@stardustlc/dsh-docker` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add @stardustlc/dsh-docker
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

安装后可说：“检查这个容器为什么退出，先查看状态和日志。”

## 依赖与配置

需要已安装且可访问的 Docker CLI 与 Docker 服务。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-docker/issues)

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。更新控件直接位于原有工作台内容末尾；没有工作台的插件，位于原生插件详情页底部。检查、更新记录和偏好在原地展开，不增加独立更新页面或设置菜单。自动检查默认开启；**自动安装默认关闭**，明确授权后才会在空闲且没有未保存修改时安装兼容的稳定补丁。开关按插件独立保存，可关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 组件在当前页面底部明确说明并操作 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
