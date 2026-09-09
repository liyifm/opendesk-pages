import type { CollectionEntry } from 'astro:content';

export type ReleaseNote = CollectionEntry<'releaseNotes'>;

export const notePath = (id: string) => `/news/${id.replace(/\.mdx?$/, '')}/`;

const inferVersion = (note: ReleaseNote) => {
  const match = `${note.data.title}\n${note.body}`.match(/\b\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?\b/i);
  return match?.[0] ?? note.data.title;
};

const findMarkdownLink = (body: string, labelPattern: RegExp) => {
  for (const match of body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)) {
    if (labelPattern.test(match[1])) return match[2];
  }

  return undefined;
};

const inferCliCommand = (body: string) =>
  body.match(/`([^`]*(?:npm|pnpm|yarn)[^`]*@bitclub\.ai\/opendesk-cli[^`]*)`/)?.[1];

export const toDownloadItem = (note?: ReleaseNote) => {
  if (!note) return undefined;

  const windowsUrl = note.data.downloads?.windows?.url ?? findMarkdownLink(note.body, /windows/i);
  const harmonyosUrl =
    note.data.downloads?.harmonyos?.url ?? findMarkdownLink(note.body, /harmony\s*os|harmonyos|鸿蒙/i);
  const macosUrl =
    note.data.downloads?.macos?.url ?? findMarkdownLink(note.body, /mac\s*os|macos|darwin|mac\s*\(/i);

  return {
    title: note.data.title,
    version: note.data.version ?? inferVersion(note),
    date: note.data.date,
    category: note.data.category,
    summary: note.data.summary ?? note.data.title,
    cli: note.data.downloads?.cli ?? inferCliCommand(note.body),
    windows: windowsUrl
      ? {
          url: windowsUrl,
          label: note.data.downloads?.windows?.label ?? 'Windows x86 安装包',
        }
      : undefined,
    harmonyos: harmonyosUrl
      ? {
          url: harmonyosUrl,
          label: note.data.downloads?.harmonyos?.label ?? 'HarmonyOS 安装包',
        }
      : undefined,
    macos: macosUrl
      ? {
          url: macosUrl,
          label: note.data.downloads?.macos?.label ?? 'MacOS 安装包',
        }
      : undefined,
    noteUrl: notePath(note.id),
  };
};
