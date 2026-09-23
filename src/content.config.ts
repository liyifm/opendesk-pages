import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const downloadFile = z.object({
  url: z.string(),
  label: z.string(),
});

/** 平台安装包：既支持单一安装包（旧版本笔记），也支持按 CPU 架构区分的多个安装包 */
const platformDownload = z.union([
  downloadFile,
  z.object({
    x86: downloadFile.optional(),
    arm64: downloadFile.optional(),
  }),
]);

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
  releaseNotes: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/release-notes' }),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.string(),
      version: z.string().optional(),
      downloads: z
        .object({
          cli: z.string().optional(),
          windows: platformDownload.optional(),
          harmonyos: platformDownload.optional(),
          macos: platformDownload.optional(),
        })
        .optional(),
      summary: z.string().optional(),
    }),
  }),
};
