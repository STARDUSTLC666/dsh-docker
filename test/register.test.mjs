import { test } from 'node:test'
import assert from 'node:assert/strict'
import { apply, inject } from '../lib/index.js'

function makeFakeCtx() {
  const registered = []
  const spawns = []
  const listeners = {}
  const ctx = {
    subprocess: {
      spawn(spec) {
        spawns.push(spec)
        return { done: Promise.resolve({ exitCode: 0, signal: null }), collected: {}, terminate() {} }
      },
    },
    tools: {
      register(definition, ...extra) {
        registered.push({ definition, extra })
        return () => {
          const index = registered.findIndex((item) => item.definition === definition)
          if (index >= 0) registered.splice(index, 1)
        }
      },
    },
    on(event, listener) {
      (listeners[event] ??= []).push(listener)
      return () => {}
    },
  }
  return { ctx, registered, listeners }
}

test('inject 声明 subprocess 与 tools', () => {
  assert.deepEqual(inject, ['subprocess', 'tools'])
})

test('apply 注册 7 个工具', () => {
  const { ctx, registered } = makeFakeCtx()
  apply(ctx, {})
  assert.equal(registered.length, 7)
  assert.ok(registered.every((item) => item.extra.length === 0))
  assert.ok(registered.every((item) => !Object.hasOwn(item.definition, 'gate')))
})

test('docker_exec 通过 tools/pre-execute 返回 ask，其他工具继续 waterfall', async () => {
  const { ctx, listeners } = makeFakeCtx()
  apply(ctx, {})
  const preExecute = listeners['tools/pre-execute'][0]
  let delegated = false
  const ask = await preExecute(
    { name: 'docker_exec', arguments: { container: 'web', command: 'ls -la' } },
    async () => { delegated = true; return { kind: 'allow' } },
  )
  assert.equal(ask.kind, 'ask')
  assert.ok(ask.reason.includes('web'))
  assert.ok(ask.reason.includes('ls -la'))
  assert.equal(delegated, false)

  const allowed = await preExecute(
    { name: 'docker_ps', arguments: {} },
    async () => { delegated = true; return { kind: 'allow' } },
  )
  assert.deepEqual(allowed, { kind: 'allow' })
  assert.equal(delegated, true)
})

test('execApproval=false 时不注册 pre-execute 审批策略', () => {
  const { ctx, listeners } = makeFakeCtx()
  apply(ctx, { execApproval: false })
  assert.equal(listeners['tools/pre-execute'], undefined)
})

test('dispose 卸载全部工具', () => {
  const { ctx, registered, listeners } = makeFakeCtx()
  apply(ctx, {})
  assert.equal(registered.length, 7)
  for (const listener of listeners.dispose ?? []) listener()
  assert.equal(registered.length, 0)
})
