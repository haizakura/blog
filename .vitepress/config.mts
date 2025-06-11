import path from 'path';
import { defineConfigWithTheme } from 'vitepress';
import UnoCSS from 'unocss/vite';
import { ThemeConfig } from './theme';

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: '灰桜 | 札記',
  description: '灰桜 | 札記 - Powered by VitePress',
  lang: 'zh-CN',
  head: [
    // inject Vercel Speed Insights
    [
      'script',
      {},
      `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`,
    ],
    ['script', { defer: '', src: '/_vercel/speed-insights/script.js' }],
  ],

  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-frappe',
    },
  },

  ignoreDeadLinks: 'localhostLinks',

  themeConfig: {
    siteBase: 'https://nya.run',
    author: 'HAIZAKURA',
    license: 'CC BY-NC-SA 4.0',
    licenseLink: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    taglines: [
      '<code>while (true) { eat() }</code>',
      '<code>(() => &lt;moe&nbsp;/&gt;)()</code>',
      '<code>nya.run()</code>',
    ],

    outline: {
      label: '目录',
      level: 'deep',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about/' },
      { text: 'Lab', link: 'https://lab.nya.run' },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/HAIZAKURA' }],

    giscus: {
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
  },
  vite: {
    plugins: [UnoCSS()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '..'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
