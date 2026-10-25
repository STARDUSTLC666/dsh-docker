# 0.4.3 验证记录

日期：2026-10-26。官方 Windows 宿主：DSH 0.2.1-rc.3。

## 行为变化

确认门读取宿主当前会话的真实审批策略；never 模式不再被误报为用户拒绝，自检明确显示无法询问的原因与解决选项。默认确认保护保持启用。

## 验证与限制

- Windows 本地：41 项，41 通过、0 跳过；没有把跳过计为通过。
- 官方 RC.3 的 tools.execute 实际调用确认 never 拒绝与健康诊断；Docker 引擎未运行，容器生命周期未验收。
- GitHub 的跨平台 CI 和 npm 发布完整性以该版本工作流及 registry 为准；本记录不把本地测试等同于已发布。

## English

Confirmation gates read the effective host session policy. Under never, execution is denied with actionable settings instead of reporting a user rejection; health reports the same state. Default gates remain enabled.

Runtime/account limits are listed above. Synthetic peers and model adapters do not establish live account delivery or model quality.
