import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createApi } from '../src/server/hono-app.js'

const catalog = {
  schemaVersion: 1,
  cases: [{ id: 'landing-page', version: 1, manifest: 'cases/landing-page/manifest.json' }],
}

const manifest = {
  schemaVersion: 1,
  id: 'landing-page',
  version: 1,
  preview: {
    files: [{ path: 'assets/index.html', type: 'html', title: { 'zh-CN': '页面', 'en-US': 'Page' } }],
  },
}

function makeBucket() {
  const objects = new Map([
    ['inspiration/catalog.json', JSON.stringify(catalog)],
    ['inspiration/cases/landing-page/manifest.json', JSON.stringify(manifest)],
    ['inspiration/cases/landing-page/assets/index.html', '<!doctype html><h1>OpenDesk</h1>'],
  ])
  return {
    async get(key) {
      const value = objects.get(key)
      if (value === undefined) return null
      const bytes = new TextEncoder().encode(value)
      return {
        size: bytes.byteLength,
        body: new Response(bytes).body,
        httpMetadata: { contentType: key.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/json' },
        async json() {
          return JSON.parse(value)
        },
        async text() {
          return value
        },
      }
    },
  }
}

test('inspiration catalog reads manifests from the bound R2 prefix', async () => {
  const response = await createApi().fetch(
    new Request('https://pages.local/api/inspiration/catalog/'),
    { INSPIRATION_BUCKET: makeBucket() },
  )
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(body.sourceId, 'opendesk-community')
  assert.equal(body.cases[0].manifest.id, 'landing-page')
  assert.match(body.cases[0].previewFiles[0].url, /caseId=landing-page/)
  assert.match(body.cases[0].assetFiles[0].url, /path=assets%2Findex.html/)
})

test('inspiration assets only expose preview files declared by the manifest', async () => {
  const env = { INSPIRATION_BUCKET: makeBucket() }
  const valid = await createApi().fetch(
    new Request('https://pages.local/api/inspiration/asset?caseId=landing-page&path=assets%2Findex.html'),
    env,
  )
  assert.equal(valid.status, 200)
  assert.equal(valid.headers.get('content-type'), 'text/html; charset=utf-8')
  assert.match(await valid.text(), /OpenDesk/)

  const undeclared = await createApi().fetch(
    new Request('https://pages.local/api/inspiration/asset?caseId=landing-page&path=private.txt'),
    env,
  )
  assert.equal(undeclared.status, 404)
})
