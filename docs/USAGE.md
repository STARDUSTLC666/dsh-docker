# dsh-docker 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

## 本次改进

推荐 docker_exec { container: "web", argv: ["printf", "%s", "a b"] }。command 与 argv 二选一；宿主不执行变量、管道或命令替换。确需容器 Shell 时显式使用 ["sh", "-c", "..."]，仍需审批。

## 安装

```bash
dsh plugin --profile web add @stardustlc/dsh-docker
```

需要本机装有 Docker（`docker version` 能出结果即可）；不在 PATH 上时用 `dockerPath` 指定。

## 卸载

```bash
dsh plugin --profile web remove @stardustlc/dsh-docker
```

卸载后重启 Web 服务。如需彻底清理，可再手动删除自己 profile `cordis.patch.yml` 中覆盖的插件行。

## 配置

```yaml
- id: docker
  name: '@stardustlc/dsh-docker'
  config:
    # dockerPath: C:\Program Files\Docker\Docker\resources\bin\docker.exe
    dockerPath: docker     # 可选；也可用环境变量 DSH_DOCKER_PATH
    timeoutMs: 60000       # 单次操作超时（默认 60 秒，5 秒 - 10 分钟）
    # execApproval: false  # 关闭 docker_exec 审批门（默认 true）
    # manageApproval: false # 关闭 stop/restart/rm 审批门（默认 true，不推荐）
```

## 工具一览

| 工具 | 作用 | 安全 |
| :-- | :-- | :-- |
| `docker_ps` | 列出容器（状态/镜像/运行态，可过滤）| — |
| `docker_images` | 列出本地镜像（仓库/标签/大小/创建时间，可只看悬空镜像）| — |
| `docker_logs` | 查看日志尾部（行数钳制，可短时 follow）| — |
| `docker_inspect` | 容器详情（镜像/状态/端口）| — |
| `docker_exec` | 容器内执行命令 | 审批门 + 容器名白名单校验 |
| `docker_manage` | start / stop / restart / rm | stop/restart/rm 审批门 |
| `docker_health` | Docker daemon 与安全配置自检 | — |

### 示例

```text
docker_ps {}
docker_ps { all: true, name: web }
docker_images { dangling: true }
docker_logs { container: web, tail: 200 }
docker_inspect { container: web }
docker_exec { container: web, command: 'df -h' }
docker_manage { container: web, action: restart }
```

## 安全设计

- **无 shell 拼接**：参数通过独立 argv 传入 Docker CLI，避免由插件拼接 shell 命令。
- **审批门**：docker_exec 与 docker_manage 的 stop/restart/rm 默认弹审批；headless 无审批通道时拒绝
- **容器名校验**：只允许 `[A-Za-z0-9][A-Za-z0-9_.:-]*`，杜绝参数注入
- **超时钳制**：单次操作 5 秒 - 10 分钟；follow 模式额外限 30 秒
- **日志钳制**：tail 1-2000 行

## 开发

```bash
pnpm install
pnpm test       # 构建并执行测试
```

## License

MIT
