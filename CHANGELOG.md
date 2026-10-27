# 更新记录

[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

## 0.5.1 (2026-10-27)

- Keep this component's own update entry visible when installed transitively through Suite. Confirm whole-Suite update scope before opening its controls.
- Keep automatic installation off by default and preserve independent installation behavior.

## 0.5.0 (2026-10-26)

- Add this plugin’s own update controls and independent preferences. Automatic installation stays off until explicitly enabled.
- Confirm manual installs, preserve local sources and disabled state, pause for tasks or unsaved changes, and use native DSH recovery without forced restarts.
- Require the public DSH 0.2.1-rc.3 update APIs; Suite components remain managed through Suite.

## 0.4.3（2026-10-26）

- 确认门读取宿主当前会话的真实审批策略；never 模式不再被误报为用户拒绝，自检明确显示无法询问的原因与解决选项。默认确认保护保持启用。
- Windows 回归 41 项通过、0 项跳过；宿主与未验收范围见[本次记录](docs/validation-0.4.3.md)。

## 0.4.2（2026-10-17）

- 补 `publishConfig.access: "public"`：与其余 scoped 包保持一致，避免发布时因默认 restricted 访问级别失败（不影响运行时行为）。
## 0.4.1 (2026-10-05)

- 修复旧版 DSH 生成 PTC SDK 时不支持的数组约束；仍在执行前严格限制 argv 的 128 项与总长度，保留精确参数和审批。

## 0.4.0 (2026-10-05)

- docker_exec 增加 argv 精确参数数组，修复空参数、相邻引号与转义；拒绝未闭合命令，并在启动前处理取消。argv 同样显示完整审批内容。

## 0.3.4 (2026-09-28)

- 更新官方 Harness 0.2.0-rc.1 的兼容声明和共同加载验证；运行时代码未变。验证范围见[验证记录](docs/VALIDATION.md)。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-docker/commits/master)。
