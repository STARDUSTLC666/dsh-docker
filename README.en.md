# dsh-docker

[中文](README.md)

![dsh-docker whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-docker/master/assets/cover-whale-girl.png)

Inspect and manage local Docker containers and images from DSH.

[![npm](https://img.shields.io/npm/v/@stardustlc/dsh-docker)](https://www.npmjs.com/package/@stardustlc/dsh-docker) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-docker-downloads.svg)](https://www.npmjs.com/package/@stardustlc/dsh-docker)

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

Ask: “Find out why this container exited. Start with its status and logs.”

## Requirements and configuration

Requires an accessible Docker CLI and Docker daemon.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-docker/issues)

## License

[MIT](LICENSE)
