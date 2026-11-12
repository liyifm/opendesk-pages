const BUCKET_BINDING = 'INSPIRATION_BUCKET'
const PREFIX = 'inspiration'
const MAX_JSON_BYTES = 2 * 1024 * 1024
const CASE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const previewCsp =
  "default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'; script-src 'none'; object-src 'none'; connect-src 'none'"

const isSafeAssetPath = (value) => {
  if (typeof value !== 'string' || !value || value.includes('\\') || value.startsWith('/')) return false
  return value.split('/').every((segment) => segment && segment !== '.' && segment !== '..')
}

const readJsonObject = async (bucket, key) => {
  const object = await bucket.get(key)
  if (!object || object.size > MAX_JSON_BYTES) return null
  if (typeof object.json === 'function') return object.json()
  return JSON.parse(await object.text())
}

const readCatalog = async (bucket) => {
  const catalog = await readJsonObject(bucket, `${PREFIX}/catalog.json`)
  if (
    !catalog ||
    catalog.schemaVersion !== 1 ||
    !Array.isArray(catalog.cases) ||
    catalog.cases.some(
      (entry) =>
        !entry ||
        !CASE_ID_PATTERN.test(entry.id) ||
        !Number.isInteger(entry.version) ||
        entry.version < 1 ||
        !isSafeAssetPath(entry.manifest) ||
        !entry.manifest.startsWith('cases/'),
    )
  ) {
    throw new Error('invalid inspiration catalog')
  }
  return catalog
}

const readCaseManifests = async (bucket, catalog) =>
  Promise.all(
    catalog.cases.map(async (entry) => {
      const manifest = await readJsonObject(bucket, `${PREFIX}/${entry.manifest}`)
      if (
        !manifest ||
        manifest.schemaVersion !== 1 ||
        manifest.id !== entry.id ||
        manifest.version !== entry.version ||
        !manifest.preview ||
        !Array.isArray(manifest.preview.files)
      ) {
        throw new Error(`invalid inspiration manifest: ${entry.id}`)
      }

      const previewFiles = manifest.preview.files.map((file) => {
        if (!file || !isSafeAssetPath(file.path)) throw new Error(`invalid inspiration preview: ${entry.id}`)
        return {
          ...file,
          url: `/api/inspiration/asset?caseId=${encodeURIComponent(entry.id)}&path=${encodeURIComponent(file.path)}`,
        }
      })

      const assetPaths = new Set([
        ...manifest.preview.files.map((file) => file.path),
        ...(manifest.inputs || []).flatMap((input) => (input.samplePath ? [input.samplePath] : [])),
        ...(manifest.template?.files || []),
      ])
      const assetFiles = [...assetPaths].map((path) => ({
        path,
        url: `/api/inspiration/asset?caseId=${encodeURIComponent(entry.id)}&path=${encodeURIComponent(path)}`,
      }))

      return { manifest, previewFiles, assetFiles }
    }),
  )

const catalogHandler = async (c) => {
  const bucket = c.env?.[BUCKET_BINDING]
  if (!bucket) return c.json({ error: 'inspiration storage is not configured' }, 503)

  try {
    const catalog = await readCatalog(bucket)
    const cases = await readCaseManifests(bucket, catalog)
    return c.json(
      {
        schemaVersion: 1,
        sourceId: 'opendesk-community',
        prefix: PREFIX,
        cases,
      },
      200,
      { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600' },
    )
  } catch (error) {
    console.error('inspiration catalog failed:', error)
    return c.json({ error: 'inspiration catalog is unavailable' }, 502)
  }
}

const assetHandler = async (c) => {
  const bucket = c.env?.[BUCKET_BINDING]
  if (!bucket) return c.json({ error: 'inspiration storage is not configured' }, 503)

  const caseId = c.req.query('caseId')
  const assetPath = c.req.query('path')
  if (!caseId || !CASE_ID_PATTERN.test(caseId) || !isSafeAssetPath(assetPath)) {
    return c.json({ error: 'invalid inspiration asset' }, 400)
  }

  try {
    const catalog = await readCatalog(bucket)
    const entry = catalog.cases.find((item) => item.id === caseId)
    if (!entry) return c.json({ error: 'inspiration case not found' }, 404)
    const manifest = await readJsonObject(bucket, `${PREFIX}/${entry.manifest}`)
    const declared = [
      ...(manifest?.preview?.files || []).map((file) => ({ path: file.path, type: file.type })),
      ...((manifest?.inputs || [])
        .filter((input) => input.samplePath)
        .map((input) => ({ path: input.samplePath, type: undefined }))),
      ...((manifest?.template?.files || []).map((path) => ({ path, type: undefined }))),
    ].find((file) => file.path === assetPath)
    if (!declared) return c.json({ error: 'inspiration asset is not declared' }, 404)

    const object = await bucket.get(`${PREFIX}/cases/${caseId}/${assetPath}`)
    if (!object) return c.json({ error: 'inspiration asset not found' }, 404)
    const headers = new Headers()
    if (object.httpMetadata?.contentType) headers.set('Content-Type', object.httpMetadata.contentType)
    headers.set('Cache-Control', 'public, max-age=300')
    headers.set(
      'Content-Security-Policy',
      declared.type === 'html' || assetPath.toLowerCase().endsWith('.html') ? previewCsp : "default-src 'none'",
    )
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('Content-Disposition', 'inline')
    return new Response(object.body, { status: 200, headers })
  } catch (error) {
    console.error('inspiration asset failed:', error)
    return c.json({ error: 'inspiration asset is unavailable' }, 502)
  }
}

export const register = (app) => {
  app.get('/inspiration/catalog', catalogHandler)
  app.get('/inspiration/catalog/', catalogHandler)
  app.get('/inspiration/asset', assetHandler)
  app.get('/inspiration/asset/', assetHandler)
}
