# dsh-docker 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

## 确认与 never 策略

execApproval 和 manageApproval 默认开启。宿主 never 策略会拒绝所有需要询问的请求；它不代表允许全部执行。若需要确认，切换至可询问策略；只有用户明确接受风险时，才分别关闭对应的插件确认门。docker_health 会显示实际策略，且继续检测 Docker daemon。

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

## 故障排查

先运行 `docker_health`：它检查 `docker version`、exec/manage 审批门与超时配置，失败项后面会直接给出下一步。

| 现象 | 常见原因 | 处理 |
| :-- | :-- | :-- |
| `Cannot connect to the Docker daemon` | 守护进程没启动 | 启动 Docker Desktop / dockerd；Windows 需要 WSL2 或 Hyper-V 后端 |
| `permission denied … docker.sock` | 当前用户不在 docker 组 | Linux/macOS 加入 docker 组后重新登录；Windows 以管理员身份启动 Docker Desktop |
| `docker: command not found` | PATH 里没有 docker | 安装 Docker CLI，或在插件配置里用 `dockerPath` 指定完整路径 |
| `No such container` / `No such image` | 名字或 ID 写错，对象已被删除 | 用 `docker_ps all=true` / `docker_images` 查真实名字 |
| `port is already allocated` | 端口被其它容器占用 | 先 `docker_ps` 找到占用者并停止，或改用其它端口 |
| `docker logs` 输出为空 | 进程还没输出，或日志驱动不是 json-file | 用 `docker_inspect` 看状态与启动时间，再调大 `tail` |
| 命令超时 | 目标繁忙或网络慢 | 确认容器/主机状态后调大 `timeoutMs` 重试 |

## License

MIT
