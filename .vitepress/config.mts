import { defineConfigWithTheme } from 'vitepress';
import { ThemeConfig } from './theme';

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: "灰桜 | 札記",
  description: "灰桜 | 札記 - Powered by VitePress",
  lang: 'zh-CN',
  head: [
    // inject Vercel Speed Insights
    [
      'script',
      {},
      `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`
    ],
    [
      'script',
      { defer: '', src: '/_vercel/speed-insights/script.js' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Lab', link: 'https://lab.nya.run' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HAIZAKURA' }
    ],

    giscus: {
      host: 'https://giscus.app',
      repo: 'HAIZAKURA/blog',
      repoId: 'R_kgDOO3j7eA',
      category: 'Comments',
      categoryId: 'DIC_kwDOO3j7eM4CrVOy',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '0',
      emitMetadata: '0',
      inputPosition: 'top',
      lang: 'zh-CN',
      loading: 'lazy',
    },

    footer: {
      copyright:
        'Copyright © 2017-2025 HAIZAKURA | <a href="https://github.com/HAIZAKURA/blog" target="_blank">GitHub</a>',
    },
  }
});
