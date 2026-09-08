[中文](README.md)

# dsh-docker

> **Your agent can manage containers now**: seven tools covering containers, images, logs, inspection, in-container exec, lifecycle management, and health checks.

DSH (DeepSeek Harness) container-management plugin: runs the docker CLI through the official subprocess service with shell-free argv arrays, approval gates on `docker_exec` and destructive lifecycle actions, and **zero runtime dependencies**.

![npm version](https://img.shields.io/npm/v/@stardustlc/dsh-docker?label=npm&color=blue) ![npm downloads](https://img.shields.io/npm/dm/@stardustlc/dsh-docker) ![license](https://img.shields.io/npm/l/@stardustlc/dsh-docker) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-docker?style=social)

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

## Compatibility

Verified against the official `@deepseek-ai/dsh@0.1.3-alpha.2` on 2026-09-08, including an 18-component co-load and the full tool registration/invocation contract. Built for the cordis patch-bundle model (`cordis.patch.yml` + `dsh.bundle.patch`) with no runtime imports of `@deepseek-ai/*` internals.

## Installation

```bash
dsh plugin --profile web add @stardustlc/dsh-docker
```

Requires Docker installed locally (`docker version` should work); use `dockerPath` when it is not on PATH.

## Uninstall

```bash
dsh plugin --profile web remove @stardustlc/dsh-docker
```

Then restart the web service. To clean up fully, also remove the plugin entry from your profile `cordis.patch.yml` if you overrode it.


## Configuration

```yaml
- id: docker
  name: '@stardustlc/dsh-docker'
  config:
    # dockerPath: C:\Program Files\Docker\Docker\resources\bin\docker.exe
    dockerPath: docker     # optional; or use the DSH_DOCKER_PATH env var
    timeoutMs: 60000       # per-operation timeout (default 60s, 5s - 10min)
    # execApproval: false  # disable the docker_exec approval gate (default true)
    # manageApproval: false # disable approval for stop/restart/rm (default true; not recommended)
```

## Tools

| Tool | Purpose | Safety |
| :-- | :-- | :-- |
| `docker_ps` | List containers (status/image/state, filterable) | — |
| `docker_images` | List local images (repository/tag/size/created, dangling-only filter) | — |
| `docker_logs` | Tail container logs (line clamp, short follow) | — |
| `docker_inspect` | Container details (image/state/ports) | — |
| `docker_exec` | Run a command inside a container | Approval gate + container-name validation |
| `docker_manage` | start / stop / restart / rm | Approval gate for stop/restart/rm |
| `docker_health` | Check Docker daemon and safety settings | — |

### Examples

```text
docker_ps {}
docker_ps { all: true, name: web }
docker_images { dangling: true }
docker_logs { container: web, tail: 200 }
docker_inspect { container: web }
docker_exec { container: web, command: 'df -h' }
docker_manage { container: web, action: restart }
```

## Safety

- **No shell**: every argument is its own argv element — command injection is impossible
- **Approval gates**: docker_exec and docker_manage stop/restart/rm ask first; headless environments without an approval channel are denied
- **Container-name validation**: only `[A-Za-z0-9][A-Za-z0-9_.:-]*` accepted — no argument injection
- **Timeout clamps**: 5s - 10min per operation; follow mode capped at an extra 30s
- **Log clamping**: tail 1-2000 lines

## Development

```bash
pnpm install
pnpm test       # build + 35 tests
```

## License

MIT
