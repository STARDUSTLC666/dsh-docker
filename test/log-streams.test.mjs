import test from 'node:test'
import assert from 'node:assert/strict'
import { buildDockerTools, resolveConfig } from '../lib/index.js'

test('docker_logs preserves stderr-only and mixed container logs', async () => {
  const results = [
    { stdout: '', stderr: 'application crashed\n' },
    { stdout: 'started\n', stderr: 'warning\n' },
    { stdout: 'partial line', stderr: 'error line' },
  ]
  const runner = { async run() { return { exitCode: 0, signal: null, ...results.shift() } } }
  const logs = buildDockerTools(resolveConfig({}), runner).find(t => t.name === 'docker_logs')
  const stderrOnly = await logs.execute({ container: 'web' })
  assert.equal(stderrOnly.text, 'application crashed\n')
  assert.match(logs.output.render({}, stderrOnly)[0].text, /application crashed/)
  assert.equal((await logs.execute({ container: 'web' })).text, 'started\nwarning\n')
  assert.equal((await logs.execute({ container: 'web' })).text, 'partial line\nerror line')
})
