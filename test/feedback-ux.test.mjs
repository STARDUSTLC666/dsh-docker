import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildDockerTools, dockerErrorHint, resolveConfig } from '../lib/index.js'

const cfg = resolveConfig({ timeoutMs: 30000 })

function makeRunner(results = []) {
  const calls = []
  return {
    calls,
    async run(argv, options) {
      calls.push({ argv: [...argv], timeoutMs: options?.timeoutMs ?? null })
      const preset = results.shift()
      return { exitCode: preset?.exitCode ?? 0, signal: null, stdout: preset?.stdout ?? '', stderr: preset?.stderr ?? '' }
    },
  }
}

test('dockerErrorHint：常见失败都给出下一步', () => {
  assert.match(dockerErrorHint('Cannot connect to the Docker daemon at unix:///var/run/docker.sock'), /守护进程不可达/)
  assert.match(dockerErrorHint('permission denied while trying to connect to the Docker daemon socket'), /权限不足/)
  assert.match(dockerErrorHint('bash: docker: command not found'), /dockerPath/)
  assert.match(dockerErrorHint('Error response from daemon: No such container: web1'), /docker_ps all=true/)
  assert.match(dockerErrorHint('Error response from daemon: Ports are not available: port is already allocated'), /端口已被占用/)
  assert.equal(dockerErrorHint('完全无关的报错'), undefined)
})

test('docker_logs：守护进程不可达时错误里带可执行下一步', async () => {
  const tool = buildDockerTools(cfg, makeRunner([{ exitCode: 1, stderr: 'Cannot connect to the Docker daemon' }])).find((t) => t.name === 'docker_logs')
  await assert.rejects(() => tool.execute({ container: 'web' }), /守护进程不可达/)
})

test('docker_ps：空列表不再只输出「共 0 个容器」', async () => {
  const tool = buildDockerTools(cfg, makeRunner([{ stdout: '' }])).find((t) => t.name === 'docker_ps')
  const running = tool.output.render({}, await tool.execute({}))[0].text
  assert.match(running, /all=true/)
  const all = tool.output.render({}, await tool.execute({ all: true }))[0].text
  assert.match(all, /docker_images/)
})

test('docker_ps：渲染带上 docker 原始状态列', async () => {
  const runner = makeRunner([{ stdout: JSON.stringify({ ID: 'a1', Names: 'web', Image: 'nginx', Status: 'Up 3 minutes', State: 'running' }) + '\n' }])
  const ps = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_ps')
  assert.match(ps.output.render({}, await ps.execute({}))[0].text, /Up 3 minutes/)
})

test('docker_logs：空日志说明原因与下一步', async () => {
  const tool = buildDockerTools(cfg, makeRunner([{ stdout: '' }])).find((t) => t.name === 'docker_logs')
  const text = tool.output.render({}, await tool.execute({ container: 'web', tail: 100 }))[0].text
  assert.match(text, /日志为空/)
  assert.match(text, /docker_inspect/)
})

test('docker_health：失败时给出下一步', async () => {
  const runner = { async run() { return { exitCode: 1, signal: null, stdout: '', stderr: 'Cannot connect to the Docker daemon' } } }
  const health = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_health')
  const value = await health.execute({})
  const text = health.output.render({}, value)[0].text
  assert.match(text, /自检：发现问题/)
  assert.match(text, /下一步：/)
  assert.match(text, /docker_health 复查/)
})

test('docker_manage：成功后提示用 docker_ps 复核', async () => {
  const tool = buildDockerTools(cfg, makeRunner([{}])).find((t) => t.name === 'docker_manage')
  assert.match(tool.output.render({}, await tool.execute({ container: 'web', action: 'stop' }))[0].text, /docker_ps/)
})

test('docker_inspect：渲染状态、启动时间与端口', async () => {
  const runner = makeRunner([{ stdout: JSON.stringify([{ Id: 'x'.repeat(20), Name: '/db', Config: { Image: 'postgres' }, State: { Status: 'running', Running: true, StartedAt: '2026-10-30T10:00:00Z' }, NetworkSettings: { Ports: [{ PublicPort: 5432, Type: 'tcp' }] } }]) }])
  const tool = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_inspect')
  const text = tool.output.render({}, await tool.execute({ container: 'db' }))[0].text
  assert.match(text, /running/)
  assert.match(text, /2026-10-30T10:00:00Z/)
  assert.match(text, /5432\/tcp/)
})
