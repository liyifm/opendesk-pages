import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const notes = (await getCollection('releaseNotes')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: 'OpenDesk 更新日志',
    description: 'OpenDesk 稳定版和每日构建更新记录。',
    site: context.site,
    items: notes.map((note) => {
      const slug = note.id.replace(/\.mdx?$/, '');
      const description = note.body.replace(/\s+/g, ' ').slice(0, 240);

      return {
        title: note.data.title,
        pubDate: note.data.date,
        link: `/news/${slug}/`,
        description,
      };
    }),
  });
}
