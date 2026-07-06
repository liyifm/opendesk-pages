import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

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
          windows: z
            .object({
              url: z.string(),
              label: z.string().default('Windows x86 安装包'),
            })
            .optional(),
          harmonyos: z
            .object({
              url: z.string(),
              label: z.string().default('HarmonyOS 安装包'),
            })
            .optional(),
        })
        .optional(),
      summary: z.string().optional(),
    }),
  }),
};
