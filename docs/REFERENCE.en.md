> Full usage reference. The landing page focuses on outcomes, installation and workflows; detailed parameters, limits, update rules and historical validation links remain here.

# dsh-docker

[中文](../README.md)

![dsh-docker whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/assets/cover-whale-girl.png)

Inspect and manage local Docker containers and images from DSH, read logs and run operations under the configured controls. Health checks distinguish engine connectivity from approval availability.

[![npm](https://img.shields.io/npm/v/@stardustlc/dsh-docker)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-total-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker)

[Download statistics](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-docker/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-docker/pulls).

## What it does

- Inspect containers, images, logs and resource status.
- Run container commands and common management operations.
- Keep execution and destructive operations under host approval.

## Install

In DSH Desktop, install `@stardustlc/dsh-docker` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add @stardustlc/dsh-docker
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

1. Start Docker Engine and confirm your user can access it through Docker commands.
2. List containers and images in DSH; select a target and inspect its status and logs.
3. Before starting, stopping or cleaning up, check the target and consequences, then confirm.
4. Recheck the result. Investigate actual permission or connection errors instead of treating an unexecuted action as success.

## Requirements and configuration

Requires an accessible Docker CLI and Docker daemon.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](USAGE.en.md). For standalone development, follow the Node requirement in [package.json](../package.json).

## Documentation

- [Usage and troubleshooting](USAGE.en.md)
- [Changelog](../CHANGELOG.md)
- [Validation scope and history](VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-docker/issues)

## Plugin updates

Requires DSH 0.2.1-rc.3 or newer. Update controls sit at the bottom of the existing workbench, or native plugin details for plugins without a workbench. Checks, release notes and preferences expand in place, with no separate update page or settings menu. Automatic checks are on by default; **automatic installation is off by default**. Only explicit opt-in permits compatible stable patches while idle with no unsaved changes. Preferences are independent, with per-plugin disable, deferral and ignore controls. No forced DSH restart or upgrade, and local-source installations stay unchanged. Suite components explain and operate on the whole Suite in the same footer.

Older releases need one manual update in native plugin management to acquire these controls. Publishing to npm does not replace an existing user installation.

## License

[MIT](../LICENSE)
