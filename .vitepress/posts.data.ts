import { createContentLoader } from 'vitepress';
import { Post } from './theme';

const loader = createContentLoader('posts/*/index.md');

export default {
  ...loader,
  /**
   * 异步加载文章数据
   *
   * 从数据源加载文章信息 解析和处理返回一个按创建时间降序排列的文章数组
   *
   * @returns {Promise<Post[]>} 返回一个Promise，解析为Post对象的数组
   */
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
      .sort((a, b) => b.create - a.create); // 按照创建时间降序排列
  },
};

declare const data: Post[];
export { data };
