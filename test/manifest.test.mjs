import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

test('dsh.bundle.patch 与 exports', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
  assert.equal(pkg.exports['./package.json'], './package.json')
})

test('cordis.patch.yml 插入行名为 dsh-docker', () => {
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.match(patch, /name: '@stardustlc\/dsh-docker'/)
  assert.match(patch, /- insert:/)
})

test('零运行时依赖 + 名称版本', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.dependencies, undefined)
  assert.equal(pkg.name, '@stardustlc/dsh-docker')
  assert.equal(pkg.version, '0.1.0')
})
