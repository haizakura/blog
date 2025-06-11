import { createContentLoader } from 'vitepress';
import { Post } from './theme';

const loader = createContentLoader('posts/*/index.md');

export default {
  ...loader,
  async load(): Promise<Post[]> {
    const data = await loader.load();
    return data
      .map((content) => {
        const post: Post = {
          ...content,
          id: /(?<=\/posts\/).*(?=\/)/.exec(content.url)![0],
          title: content.frontmatter.title,
          description: content.frontmatter.description,
          tags: content.frontmatter.tags ?? [],
          create: content.frontmatter.create
            ? new Date(content.frontmatter.create).getTime()
            : Date.now(),
        };
        return post;
      })
      .sort((a, b) => b.create - a.create);
  },
};
