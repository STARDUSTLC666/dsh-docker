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

test('docker_exec 与破坏性 docker_manage 返回 ask，安全操作继续 waterfall', async () => {
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

  const manageAsk = await preExecute(
    { name: 'docker_manage', arguments: { container: 'web', action: 'rm' } },
    async () => { delegated = true; return { kind: 'allow' } },
  )
  assert.equal(manageAsk.kind, 'ask')
  assert.ok(manageAsk.reason.includes('web'))
  assert.ok(manageAsk.reason.includes('rm'))

  delegated = false
  const startAllowed = await preExecute(
    { name: 'docker_manage', arguments: { container: 'web', action: 'start' } },
    async () => { delegated = true; return { kind: 'allow' } },
  )
  assert.deepEqual(startAllowed, { kind: 'allow' })
  assert.equal(delegated, true)

  delegated = false
  const allowed = await preExecute(
    { name: 'docker_ps', arguments: {} },
    async () => { delegated = true; return { kind: 'allow' } },
  )
  assert.deepEqual(allowed, { kind: 'allow' })
  assert.equal(delegated, true)
})

test('两类审批均关闭时不注册 pre-execute 策略', () => {
  const { ctx, listeners } = makeFakeCtx()
  apply(ctx, { execApproval: false, manageApproval: false })
  assert.equal(listeners['tools/pre-execute'], undefined)
})

test('无效配置响亮失败，不静默回退默认值', () => {
  const { ctx } = makeFakeCtx()
  assert.throws(() => apply(ctx, { timeoutMs: -1 }), /timeoutMs/)
})

test('dispose 卸载全部工具', () => {
  const { ctx, registered, listeners } = makeFakeCtx()
  apply(ctx, {})
  assert.equal(registered.length, 7)
  for (const listener of listeners.dispose ?? []) listener()
  assert.equal(registered.length, 0)
})
