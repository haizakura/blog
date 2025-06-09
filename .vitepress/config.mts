import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "灰桜 | 札記",
  description: "灰桜 | 札記 - Powered by VitePress",
  lang: 'zh-CN',
  head: [
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
    ]
  }
});
