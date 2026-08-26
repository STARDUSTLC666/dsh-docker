import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildDockerTools, resolveConfig } from '../lib/index.js'

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

const cfg = resolveConfig({ timeoutMs: 30000 })

test('构建 6 个工具且名字正确', () => {
  const names = buildDockerTools(cfg, makeRunner()).map((t) => t.name).sort()
  assert.deepEqual(names, ['docker_exec', 'docker_health', 'docker_images', 'docker_inspect', 'docker_logs', 'docker_manage', 'docker_ps'])
})

test('每个工具 schema 是 object JSON Schema', () => {
  for (const tool of buildDockerTools(cfg, makeRunner())) {
    assert.equal(tool.parameters.type, 'object')
    assert.equal(typeof tool.parameters.properties, 'object')
    assert.equal(tool.output.schema.type, 'object')
    assert.equal(typeof tool.output.render, 'function')
    assert.equal(typeof tool.execute, 'function')
  }
})

test('docker_ps：解析容器列表', async () => {
  const runner = makeRunner([{ stdout: JSON.stringify({ ID: 'a1', Names: 'web', Image: 'nginx', Status: 'Up', State: 'running' }) + '\n' }])
  const ps = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_ps')
  const value = await ps.execute({ all: true })
  assert.equal(value.count, 1)
  assert.equal(value.containers[0].name, 'web')
  assert.ok(runner.calls[0].argv.includes('--all'))
})

test('docker_logs：tail 钳制 + 非零退出抛中文错误', async () => {
  const runner = makeRunner([{ stdout: 'line1\nline2' }])
  const logs = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_logs')
  const value = await logs.execute({ container: 'web', tail: 99999 })
  assert.equal(value.tail, 2000)
  assert.ok(value.text.includes('line2'))
  const failing = buildDockerTools(cfg, makeRunner([{ exitCode: 1, stderr: 'no such container' }])).find((t) => t.name === 'docker_logs')
  await assert.rejects(() => failing.execute({ container: 'nope' }), /docker logs.*失败.*no such container/)
})

test('docker_images：解析镜像列表', async () => {
  const runner = makeRunner([{ stdout: JSON.stringify({ ID: 'sha256:abc', Repository: 'nginx', Tag: 'latest', Size: '188MB', CreatedSince: '2 days ago' }) + '\n' }])
  const images = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_images')
  const value = await images.execute({ dangling: true })
  assert.equal(value.count, 1)
  assert.equal(value.images[0].repository, 'nginx')
  assert.ok(runner.calls[0].argv.includes('--filter'))
})

test('docker_inspect：摘要', async () => {
  const runner = makeRunner([{ stdout: JSON.stringify([{ Id: 'x'.repeat(20), Name: '/db', Config: { Image: 'postgres' }, State: { Status: 'running', Running: true, StartedAt: 'x' }, NetworkSettings: { Ports: [] } }]) }])
  const inspect = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_inspect')
  const value = await inspect.execute({ container: 'db' })
  assert.equal(value.info.name, 'db')
  assert.equal(value.info.running, true)
})

test('docker_exec：命令拆分 + 容器名校验', async () => {
  const runner = makeRunner([{ stdout: 'ok' }])
  const execTool = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_exec')
  const value = await execTool.execute({ container: 'web', command: 'echo hi' })
  assert.equal(value.exitCode, 0)
  assert.deepEqual(runner.calls[0].argv, ['docker', 'exec', 'web', 'echo', 'hi'])
  await assert.rejects(() => execTool.execute({ container: 'x; rm -rf', command: 'ls' }), /非法/)
  await assert.rejects(() => execTool.execute({ container: 'web', command: '   ' }), /为必填|不能为空/)
})

test('docker_manage：action 校验', async () => {
  const runner = makeRunner([{}])
  const manage = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_manage')
  const value = await manage.execute({ container: 'web', action: 'rm' })
  assert.equal(value.action, 'rm')
  assert.ok(runner.calls[0].argv.includes('--force'))
  await assert.rejects(() => manage.execute({ container: 'web', action: 'explode' }), /action 必须是/)
})

test('execute 返回值可 JSON 序列化', async () => {
  const ps = buildDockerTools(cfg, makeRunner([{ stdout: '' }])).find((t) => t.name === 'docker_ps')
  const value = await ps.execute({})
  assert.deepEqual(JSON.parse(JSON.stringify(value)), value)
})
