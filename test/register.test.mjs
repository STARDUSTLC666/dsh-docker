import { test } from 'node:test'
import assert from 'node:assert/strict'
import { apply, inject } from '../lib/index.js'

function makeFakeCtx(approval) {
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
      register(definition, options) {
        registered.push({ definition, options })
        return () => {
          const index = registered.findIndex((item) => item.definition === definition)
          if (index >= 0) registered.splice(index, 1)
        }
      },
    },
    get(name) {
      if (name === 'approval') return approval
      return undefined
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
  const { ctx, registered } = makeFakeCtx({ request: async () => 'allowed-once' })
  apply(ctx, {})
  assert.equal(registered.length, 7)
})

test('docker_exec 审批门：放行/拒绝/无通道', async () => {
  const { ctx, registered } = makeFakeCtx({ request: async () => 'allowed-once' })
  apply(ctx, {})
  const execTool = registered.find((item) => item.definition.name === 'docker_exec').definition
  assert.equal(await execTool.gate({ args: { container: 'a', command: 'ls' } }, async () => 'OK'), 'OK')

  const { ctx: ctx2, registered: reg2 } = makeFakeCtx({ request: async () => 'rejected' })
  apply(ctx2, {})
  const denied = await reg2.find((item) => item.definition.name === 'docker_exec').definition.gate({ args: { container: 'a', command: 'rm -rf /' } }, async () => 'OK')
  assert.equal(denied.kind, 'deny')

  const { ctx: ctx3, registered: reg3 } = makeFakeCtx(undefined)
  apply(ctx3, {})
  const noChannel = await reg3.find((item) => item.definition.name === 'docker_exec').definition.gate({ args: {} }, async () => 'OK')
  assert.equal(noChannel.kind, 'deny')
  assert.ok(noChannel.reason.includes('execApproval'))
})

test('execApproval=false 时不注入审批门', async () => {
  const { ctx, registered } = makeFakeCtx(undefined)
  apply(ctx, { execApproval: false })
  const execTool = registered.find((item) => item.definition.name === 'docker_exec').definition
  assert.equal(await execTool.gate({ args: {} }, async () => 'OK'), 'OK')
})

test('dispose 卸载全部工具', () => {
  const { ctx, registered, listeners } = makeFakeCtx({ request: async () => 'allowed-once' })
  apply(ctx, {})
  assert.equal(registered.length, 7)
  for (const listener of listeners.dispose ?? []) listener()
  assert.equal(registered.length, 0)
})
