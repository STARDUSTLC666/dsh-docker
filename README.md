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

## License

[MIT](LICENSE)
