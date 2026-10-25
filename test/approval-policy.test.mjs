import test from 'node:test'
import assert from 'node:assert/strict'
import { apply, buildDockerTools, resolveConfig } from '../lib/index.js'

function context(policy = 'ask', override) {
  const listeners = {}, definitions = []
  const ctx = {
    approval: { config: { policy }, overrideOf: () => override },
    subprocess: { spawn() { throw new Error('Must not execute docker in policy tests') } },
    tools: { register(tool) { definitions.push(tool); return () => {} } },
    on(event, listener) { (listeners[event] ??= []).push(listener); return () => {} },
  }
  return { ctx, listeners, definitions }
}

test('never policy explains plugin-required confirmation instead of asking an impossible question', async () => {
  const { ctx, listeners } = context('ask', 'never')
  apply(ctx, {})
  for (const [name, args, setting] of [
    ['docker_exec', { container: 'demo', argv: ['id'] }, 'execApproval'],
    ...['stop', 'restart', 'rm'].map(action => ['docker_manage', { container: 'demo', action }, 'manageApproval']),
  ]) {
    const result = await listeners['tools/pre-execute'][0]({ name, arguments: args, agent: { session: {} } }, async () => ({ kind: 'allow' }))
    assert.equal(result.kind, 'deny')
    assert.match(result.reason, /never/)
    assert.ok(result.reason.includes(setting))
    assert.doesNotMatch(result.reason, /user rejected/i)
  }
})

test('Docker confirmation never hides a downstream denial; explicitly disabled gates delegate', async () => {
  const denial = { kind: 'deny', reason: 'another host policy forbids this operation' }
  const { ctx, listeners } = context()
  apply(ctx, {})
  assert.deepEqual(await listeners['tools/pre-execute'][0]({ name: 'docker_exec', arguments: {} }, async () => denial), denial)
  const second = context('never')
  apply(second.ctx, { execApproval: false })
  assert.deepEqual(await second.listeners['tools/pre-execute'][0]({ name: 'docker_exec', arguments: {}, agent: { session: {} } }, async () => denial), denial)
})

test('health renders policy details and marks confirmation blocked by never as unavailable', async () => {
  const runner = { async run() { return { exitCode: 0, signal: null, stdout: 'test-server', stderr: '' } } }
  const health = buildDockerTools(resolveConfig({}), runner, () => 'never').find(tool => tool.name === 'docker_health')
  const value = await health.execute({}, { agent: { session: {} } })
  assert.equal(value.ok, false)
  assert.equal(value.checks.find(check => check.name === 'exec 审批门').ok, false)
  assert.match(health.output.render({}, value)[0].text, /never/)
})
