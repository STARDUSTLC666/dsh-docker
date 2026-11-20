import test from 'node:test'
import assert from 'node:assert/strict'
import { buildDockerTools, resolveConfig } from '../lib/index.js'

test('docker_inspect reads real port binding objects including multiple hosts and unbound ports', async () => {
  const runner = { async run() { return { exitCode: 0, signal: null, stderr: '', stdout: JSON.stringify([{ Name: '/web', Config: { Image: 'nginx' }, NetworkSettings: { Ports: {
    '80/tcp': [{ HostIp: '0.0.0.0', HostPort: '8080' }, { HostIp: '::', HostPort: '8080' }],
    '53/udp': [{ HostIp: '127.0.0.1', HostPort: '5353' }], '443/tcp': null,
  } } }]) } } }
  const tool = buildDockerTools(resolveConfig({}), runner).find(tool => tool.name === 'docker_inspect')
  const value = await tool.execute({ container: 'web' })
  assert.deepEqual(value.info.ports, ['0.0.0.0:8080->80/tcp', '[::]:8080->80/tcp', '127.0.0.1:5353->53/udp'])
  assert.match(tool.output.render({}, value)[0].text, /8080->80\/tcp/)
})
