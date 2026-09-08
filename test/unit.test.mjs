import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  psArgs, logsArgs, inspectArgs, execArgs, manageArgs, imagesArgs, splitCommand,
  parsePsJson, parseInspectJson, parseImagesJson, resolveConfig, assertContainerRef,
} from '../lib/index.js'

test('psArgs：格式与过滤', () => {
  assert.deepEqual(psArgs('docker', false), ['docker', 'ps', '--format', 'json'])
  assert.deepEqual(psArgs('docker', true, 'web'), ['docker', 'ps', '--all', '--format', 'json', '--filter', 'name=web'])
})

test('logsArgs：tail 钳制与 follow', () => {
  assert.deepEqual(logsArgs('docker', 'web', 100, false), ['docker', 'logs', '--tail', '100', 'web'])
  assert.deepEqual(logsArgs('docker', 'web', 50, true), ['docker', 'logs', '--follow', '--tail', '50', 'web'])
})

test('imagesArgs：JSON 格式与悬空过滤', () => {
  assert.deepEqual(imagesArgs('docker'), ['docker', 'images', '--format', 'json'])
  assert.deepEqual(imagesArgs('docker', true), ['docker', 'images', '--format', 'json', '--filter', 'dangling=true'])
})

test('inspect/exec/manage argv', () => {
  assert.deepEqual(inspectArgs('docker', 'web'), ['docker', 'inspect', 'web'])
  assert.deepEqual(execArgs('docker', 'web', ['ls', '-la']), ['docker', 'exec', 'web', 'ls', '-la'])
  assert.deepEqual(manageArgs('docker', 'rm', 'web'), ['docker', 'rm', '--force', 'web'])
  assert.deepEqual(manageArgs('docker', 'restart', 'web'), ['docker', 'restart', 'web'])
})

test('splitCommand：空白拆分 + 引号', () => {
  assert.deepEqual(splitCommand('ls -la /tmp'), ['ls', '-la', '/tmp'])
  assert.deepEqual(splitCommand("sh -c 'echo hi'"), ['sh', '-c', 'echo hi'])
  assert.deepEqual(splitCommand(''), [])
})

test('parsePsJson：docker ps JSON 行', () => {
  const lines = [
    JSON.stringify({ ID: 'abc123', Names: 'web-1', Image: 'nginx:latest', Status: 'Up 3 hours', State: 'running' }),
    'not-json-line',
    JSON.stringify({ ID: 'def456', Names: 'db-1', Image: 'postgres:16', Status: 'Exited (0)', State: 'exited' }),
  ].join('\n')
  const rows = parsePsJson(lines)
  assert.equal(rows.length, 2)
  assert.equal(rows[0].name, 'web-1')
  assert.equal(rows[1].state, 'exited')
})

test('parseImagesJson：docker images JSON 行', () => {
  const rows = parseImagesJson(JSON.stringify({ ID: 'sha256:abc', Repository: 'nginx', Tag: 'latest', Size: '188MB', CreatedSince: '2 days ago' }) + '\nbad-line\n')
  assert.equal(rows.length, 1)
  assert.equal(rows[0].repository, 'nginx')
  assert.equal(rows[0].size, '188MB')
})

test('parseInspectJson：摘要提取', () => {
  const inspect = JSON.stringify([{
    Id: 'abcdef1234567890',
    Name: '/web-1',
    Config: { Image: 'nginx:latest' },
    State: { Status: 'running', Running: true, StartedAt: '2026-08-14T00:00:00Z' },
    NetworkSettings: { Ports: [{ PublicPort: 8080, Type: 'tcp' }] },
  }])
  const info = parseInspectJson(inspect)
  assert.equal(info.id, 'abcdef123456')
  assert.equal(info.name, 'web-1')
  assert.equal(info.running, true)
  assert.deepEqual(info.ports, ['8080/tcp'])
})

test('resolveConfig：默认值与钳制', () => {
  const cfg = resolveConfig({})
  assert.equal(cfg.dockerPath, 'docker')
  assert.equal(cfg.timeoutMs, 60000)
  assert.equal(cfg.execApproval, true)
  assert.equal(resolveConfig({ timeoutMs: 99999999 }).timeoutMs, 600000)
  assert.equal(cfg.execApproval, true)
  assert.equal(cfg.manageApproval, true)
  assert.equal(resolveConfig({ execApproval: false, manageApproval: false }).manageApproval, false)
  assert.throws(() => resolveConfig({ timeoutMs: -1 }), /timeoutMs/)
})

test('DSH_DOCKER_PATH 环境变量回退', () => {
  assert.equal(resolveConfig({}, { DSH_DOCKER_PATH: ' /usr/local/bin/docker ' }).dockerPath, '/usr/local/bin/docker')
  assert.equal(resolveConfig({ dockerPath: 'podman' }, { DSH_DOCKER_PATH: '/usr/bin/docker' }).dockerPath, 'podman')
})

test('assertContainerRef 防注入', () => {
  assert.equal(assertContainerRef('web-1'), 'web-1')
  assert.throws(() => assertContainerRef('x; rm -rf /'), /非法/)
  assert.throws(() => assertContainerRef('-it'), /非法/)
})
