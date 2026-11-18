[简体中文](README.md) · **English**

# Docker

**Inspect containers and diagnose problems from DSH.**

Docker management plugin for DeepSeek Harness (`>=0.2.2-rc.3`): inspects containers and images, reads logs, runs bounded in-container commands behind host approval gates, and cleans up cleanly on Cordis hot reload.

[![npm](https://img.shields.io/npm/v/@stardustlc/dsh-docker)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-total-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker)

**[Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/docs/assets/intro/workflow-en-light.svg" alt="Inspect containers and diagnose problems from DSH. · workflow illustration" width="100%">
</picture>

## Features

- Inspect containers, images and resource status.
- Read logs or run controlled commands against a specific target.
- Review the impact of start, stop and cleanup actions.

## Install

Open **Plugins** in the DSH desktop app and install `@stardustlc/dsh-docker`. If the CLI is available:

```bash
dsh plugin --profile desktop add @stardustlc/dsh-docker
```

For the web profile, replace `desktop` with `web`. Restart that DSH profile after installation. The package’s DSH requirement is `>=0.2.2-rc.3`.

## Start using it

Skip switching terminals for `docker ps / logs / inspect` — follow a safe read-first workflow:

1. **Make sure Docker is running**: Start Docker Desktop or Docker Engine; status checks, image listings, and log reads run read-only without touching running services.
2. **Pinpoint failing containers**: Ask the assistant to list unhealthy or exited containers, pull recent logs, and cross-reference errors against your workspace code.
3. **Approve state changes explicitly**: In-container commands (`exec`) and stop/restart/remove actions pause for host confirmation so you can verify the exact container name before execution.

Ready-to-copy prompts:

- **Read-only diagnosis**: `Check which containers are running or exited, pull the last 100 log lines of any failing service, and explain the root cause without restarting anything.`
- **Local stack check**: `Inspect the port mappings and health status of our local Postgres and Redis containers against .env.example.`
- **Restart & verify**: `Restart the api-server container after my confirmation, then check its startup logs to confirm it came up cleanly.`

## Before you start

Requires a running Docker Engine accessible to the current user. Actions follow host approval.

Configuration, detailed tools and troubleshooting: [full reference](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.en.md).

## Plugin updates

Check updates at the bottom of the workbench or native plugin details. Automatic checks are on by default; **automatic installation is off**. You choose whether to install and when to restart. Suite-managed components update with their bundle. [Update behavior](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.en.md).

## Documentation

- [Full usage, configuration and limits](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/REFERENCE.en.md)
- [Release notes](https://github.com/STARDUSTLC666/dsh-docker/blob/master/CHANGELOG.md)
- [Validation scope and history](https://github.com/STARDUSTLC666/dsh-docker/blob/master/docs/VALIDATION.md)

## Feedback and contributions

If the plugin helps, a Star makes it easier for others to discover. Report problems or suggest improvements in [Issues](https://github.com/STARDUSTLC666/dsh-docker/issues); code and documentation [PRs](https://github.com/STARDUSTLC666/dsh-docker/pulls) are welcome. Include versions and reproduction steps, and remove credentials from reports.

## License

[MIT](https://github.com/STARDUSTLC666/dsh-docker/blob/master/LICENSE)

<a id="what-it-does"></a>
<a id="requirements-and-configuration"></a>
