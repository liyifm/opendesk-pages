import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const rootPath = root.pathname;
const sourceFiles = [];
const files = new Set();
const routes = new Set(['/']);
const siteOrigin = process.env.SITE_ORIGIN ?? 'https://opendesk.bitclub.ai';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }

    const rel = `/${relative(rootPath, path).replaceAll('\\', '/')}`;
    files.add(rel);

    if (rel.endsWith('/index.html')) {
      routes.add(rel.slice(0, -10));
    } else if (rel.endsWith('.html')) {
      routes.add(rel);
    }

    if (rel.endsWith('.html') || rel.endsWith('.xml')) sourceFiles.push(path);
  }
}

try {
  await stat(root);
} catch {
  console.error('dist/ not found. Run `pnpm build` before `pnpm check:links`.');
  process.exit(1);
}

await walk(rootPath);

const missing = [];
const attrPattern = /(?:href|src)=["']([^"']+)["']/g;
const xmlLinkPattern = /<(?:link|guid|loc)(?:\s[^>]*)?>([^<]+)<\/(?:link|guid|loc)>/g;

function decodeXml(text) {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function extractUrls(path, body) {
  if (path.endsWith('.xml')) {
    return [
      ...Array.from(body.matchAll(xmlLinkPattern), (match) => decodeXml(match[1].trim())),
      ...Array.from(body.matchAll(attrPattern), (match) => decodeXml(match[1].trim())),
    ];
  }

  return Array.from(body.matchAll(attrPattern), (match) => match[1]);
}

for (const path of sourceFiles) {
  const source = `/${relative(rootPath, path).replaceAll('\\', '/')}`;
  const body = await readFile(path, 'utf8');

  for (const rawUrl of extractUrls(path, body)) {
    if (/^(mailto:|tel:|#|data:|javascript:)/.test(rawUrl)) continue;

    const cleanUrl = rawUrl.split('#')[0].split('?')[0];
    if (!cleanUrl) continue;

    let absoluteUrl;
    if (/^https?:/.test(cleanUrl)) {
      const parsedUrl = new URL(cleanUrl);
      if (parsedUrl.origin !== siteOrigin) continue;
      absoluteUrl = parsedUrl.pathname;
    } else {
      absoluteUrl = cleanUrl.startsWith('/')
        ? cleanUrl
        : new URL(cleanUrl, `${siteOrigin}/${relative(rootPath, path).replaceAll('\\', '/')}`).pathname;
    }

    const candidates = absoluteUrl.endsWith('/')
      ? [absoluteUrl, `${absoluteUrl}index.html`]
      : [absoluteUrl, `${absoluteUrl}/`, `${absoluteUrl}/index.html`];

    if (!candidates.some((candidate) => routes.has(candidate) || files.has(candidate))) {
      missing.push(`${source} -> ${absoluteUrl}`);
    }
  }
}

if (missing.length > 0) {
  console.error(`Found ${missing.length} missing internal link(s):`);
  for (const item of missing) console.error(item);
  process.exit(1);
}

console.log(`Checked ${sourceFiles.length} HTML/XML file(s); no missing internal links.`);
