import type { CollectionEntry } from 'astro:content';
import type { CpuArch } from './device';

export type ReleaseNote = CollectionEntry<'releaseNotes'>;

export const notePath = (id: string) => `/news/${id.replace(/\.mdx?$/, '')}/`;

export type DownloadOs = 'windows' | 'macos' | 'harmonyos';

export interface DownloadAsset {
  url: string;
  label: string;
  /** 安装包对应的 CPU 架构，未区分架构的包不设置 */
  arch?: CpuArch;
}

export interface DownloadItem {
  title: string;
  version: string;
  date: Date;
  category: string;
  summary: string;
  cli?: string;
  windows: DownloadAsset[];
  harmonyos: DownloadAsset[];
  macos: DownloadAsset[];
  noteUrl: string;
}

const inferVersion = (note: ReleaseNote) => {
  const match = `${note.data.title}\n${note.body}`.match(/\b\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?\b/i);
  return match?.[0] ?? note.data.title;
};

const findMarkdownDownload = (body: string, labelPattern: RegExp) => {
  for (const match of body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)) {
    if (labelPattern.test(match[1])) return { label: match[1].trim(), url: match[2] };
  }

  return undefined;
};

const inferCliCommand = (body: string) =>
  body.match(/`([^`]*(?:npm|pnpm|yarn)[^`]*@bitclub\.ai\/opendesk-cli[^`]*)`/)?.[1];

const inferArchFromUrl = (url: string): CpuArch | undefined => {
  if (/arm64|aarch64/i.test(url)) return 'arm64';
  if (/x86|x64|amd64|win32|i686/i.test(url)) return 'x86';
  return undefined;
};

const archOrder = (preferred: CpuArch): CpuArch[] =>
  preferred === 'arm64' ? ['arm64', 'x86'] : ['x86', 'arm64'];

interface PlatformFile {
  url: string;
  label: string;
}

/** 笔记 frontmatter 中某个平台的安装包声明，可能是单一包，也可能按架构拆分 */
interface PlatformSource {
  url?: string;
  label?: string;
  x86?: PlatformFile;
  arm64?: PlatformFile;
}

const platformAssets = (
  platform: PlatformSource | undefined,
  fallback: { label: string; link?: { label: string; url: string }; preferredArch?: CpuArch },
): DownloadAsset[] => {
  if (platform) {
    const assets: DownloadAsset[] = [];
    for (const arch of archOrder(fallback.preferredArch ?? 'x86')) {
      const file = platform[arch];
      if (file) assets.push({ url: file.url, label: file.label, arch });
    }
    if (assets.length > 0) return assets;
    if (platform.url) {
      return [{ url: platform.url, label: platform.label ?? fallback.label, arch: inferArchFromUrl(platform.url) }];
    }
  }

  // 早期版本没有 downloads 配置，回退到正文里的安装包链接，沿用链接自身的名称
  return fallback.link
    ? [{ url: fallback.link.url, label: fallback.link.label, arch: inferArchFromUrl(fallback.link.url) }]
    : [];
};

export const toDownloadItem = (note?: ReleaseNote): DownloadItem | undefined => {
  if (!note) return undefined;

  const downloads = note.data.downloads;

  return {
    title: note.data.title,
    version: note.data.version ?? inferVersion(note),
    date: note.data.date,
    category: note.data.category,
    summary: note.data.summary ?? note.data.title,
    cli: downloads?.cli ?? inferCliCommand(note.body),
    windows: platformAssets(downloads?.windows, {
      label: 'Windows 安装包',
      link: findMarkdownDownload(note.body, /windows/i),
      preferredArch: 'x86',
    }),
    harmonyos: platformAssets(downloads?.harmonyos, {
      label: 'HarmonyOS 安装包',
      link: findMarkdownDownload(note.body, /harmony\s*os|harmonyos|鸿蒙/i),
    }),
    macos: platformAssets(downloads?.macos, {
      label: 'MacOS 安装包',
      link: findMarkdownDownload(note.body, /mac\s*os|macos|darwin|mac\s*\(/i),
      preferredArch: 'arm64',
    }),
    noteUrl: notePath(note.id),
  };
};
