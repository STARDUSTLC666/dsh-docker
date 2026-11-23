**简体中文** · [English](README.en.md)

# Docker

> **在 DeepSeek Harness 里只读巡检容器与日志，审批确认后再执行变更。**

DeepSeek Harness（`>=0.2.2-rc.3`）Docker 管理插件：提供容器/镜像状态巡检、日志排障与受宿主审批保护的 `exec` 及生命周期操作，支持 Cordis 热重载清理。

[![npm](https://img.shields.io/npm/v/@stardustlc/dsh-docker)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-total-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker)

**[核心能力](#核心能力) · [安装](#安装) · [快速上手](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-zh-light.svg" alt="在 DSH 里看容器状态、读日志、处理问题。 · 流程示意" width="100%">
</picture>

## 核心能力

| 能力 | 说明 |
| :--- | :--- |
| **只读巡检** | 查看容器运行状态、镜像列表、端口映射、环境变量与引擎健康自检，零破坏风险 |
| **日志排障** | 拉取异常或退出容器的近期日志，直接结合工作区代码定位报错根因 |
| **受控执行与审批门** | 容器内诊断命令（`exec`）及启动、停止、重启、清理操作均经宿主明确审批确认，清晰反馈权限原因 |

## 安装

在 DSH 桌面版「插件」面板安装 `@stardustlc/dsh-docker`，或使用命令行：

```bash
dsh plugin --profile desktop add @stardustlc/dsh-docker
```

网页版将 `desktop` 改为 `web`，安装后重启 DSH。宿主要求：`>=0.2.2-rc.3`。

## 开始使用

1. **确认本地 Docker 运行**：启动 Docker Desktop 或守护进程；状态巡检与日志读取全程只读。
2. **定位异常容器**：让助手列出异常退出的容器并拉取最近报错日志，结合当前项目代码排查原因。
3. **审批后执行变更**：需在容器内跑命令或重启/停止/删除容器时，核对宿主弹出的确认卡片后再放行并复查日志。

### 常用对话示例

- **只读排障**：`看看现在有哪些容器在跑或刚挂掉，把报错容器最近 100 行日志拉出来分析原因，先别重启。`
- **核对联调环境**：`检查本地数据库和缓存容器的端口映射、环境变量与健康状态是否和项目配置一致。`
- **确认后重启验证**：`重启 api-server 容器（执行前让我确认），启动后再看最新日志确认无报错。`

## 开始前要知道

- 需本机 Docker Engine 处于运行状态且当前用户可访问；写操作受宿主审批策略约束。
- 详细配置、工具与排错见 [完整说明](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；Suite 管理的组件随整包更新。

## 文档与反馈

- [完整使用、配置与边界](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.zh.md) · [更新记录](https://github.com/STARDUSTLC666/dsh-docker/blob/master/CHANGELOG.md) · [验证历史](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/VALIDATION.md)
- 欢迎 Star、提交 [Issues](https://github.com/STARDUSTLC666/dsh-docker/issues) 与 [PR](https://github.com/STARDUSTLC666/dsh-docker/pulls)（反馈请附版本与复现步骤，并移除凭据）。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-docker/blob/master/LICENSE)

<a id="依赖与配置"></a>
