**简体中文** · [English](README.en.md)

# Docker

**在 DSH 里看容器状态、读日志、处理问题。**

[![npm](https://img.shields.io/npm/v/@stardustlc/dsh-docker)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-total-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-light.svg" alt="在 DSH 里看容器状态、读日志、处理问题。 · 流程示意" width="100%">
</picture>

## 功能

- 查看容器、镜像和资源状态。
- 围绕具体目标读取日志或运行受控命令。
- 核对启动、停止和清理操作的影响。

## 安装

在 DSH 桌面版「插件」面板安装 `@stardustlc/dsh-docker`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add @stardustlc/dsh-docker
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.1-rc.3` 为准。

## 开始使用

1. 启动 Docker Engine，确认当前用户可通过 Docker 命令访问引擎。
2. 在 DSH 中先列出容器和镜像，选择具体目标，读取状态与日志。
3. 需要启动、停止或清理时，先核对目标名称及影响，再确认操作。
4. 操作后重新检查状态；权限或连接失败时按实际错误排查，不把未执行视为成功。

可以这样说：

> 检查 Docker 引擎，列出容器并查看这个容器的最近日志，暂不执行管理操作。

## 开始前要知道

需要已运行且当前用户可访问的 Docker Engine；操作遵循宿主审批。

配置、完整工具与排错见[详细使用说明](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。[查看更新规则](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.zh.md)。

## 文档

- [详细使用、配置与边界](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.zh.md)
- [更新记录](https://github.com/STARDUSTLC666/dsh-docker/blob/master/CHANGELOG.md)
- [验证范围与历史](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/VALIDATION.md)

## 反馈与贡献

如果插件帮到了你，欢迎 Star，让更多人发现它。问题和建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-docker/issues)，也欢迎代码与文档 [PR](https://github.com/STARDUSTLC666/dsh-docker/pulls)。反馈时附上版本与复现步骤，并移除凭据。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-docker/blob/master/LICENSE)

<a id="依赖与配置"></a>
