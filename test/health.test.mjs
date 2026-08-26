import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildDockerTools, resolveConfig } from '../lib/index.js'

const cfg = resolveConfig({ timeoutMs: 30000 })

test('docker_health 守护进程可达时 ok=true', async () => {
  const runner = { async run() { return { exitCode: 0, signal: null, stdout: '27.1.1', stderr: '' } } }
  const health = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.match(String(value.checks[0].detail), /27\.1\.1/)
  const blocks = health.output.render({}, value)
  assert.match(blocks[0].text, /自检：正常/)
})

test('docker_health 守护进程不可达时 ok=false 且给出原因', async () => {
  const runner = { async run() { return { exitCode: 1, signal: null, stdout: '', stderr: 'Cannot connect to the Docker daemon' } } }
  const health = buildDockerTools(cfg, runner).find((t) => t.name === 'docker_health')
  const value = await health.execute({})
  assert.equal(value.ok, false)
  assert.match(String(value.checks[0].detail), /daemon|Docker|退出码/i)
})
