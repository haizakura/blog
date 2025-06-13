import path from 'path';
import { defineConfigWithTheme } from 'vitepress';
import UnoCSS from 'unocss/vite';
import { ThemeConfig } from './theme';

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: '灰桜 札記',
  description: '灰桜 札記 - Powered by VitePress',
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
      '<code>[moe.things]::haizakura</code>',
      '发生甚么事了？',
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

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        /**
         * @param {string} src
         * @param {import('vitepress').MarkdownEnv} env
         * @param {import('markdown-it-async')} md
         *
         * @returns {Promise<string>}
         */
        async _render(src, env, md) {
          const html = md.render(src, env);
          if (env.frontmatter?.title) {
            return md.render(`# ${env.frontmatter.title}`) + html;
          }
          return html;
        },
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            displayDetails: '显示详细列表',
            backButtonTitle: '关闭搜索',
            noResultsText: '无法找到相关文章',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

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
        'Copyright © 2017-2025 HAIZAKURA | <a href="https://github.com/HAIZAKURA/blog" target="_blank">GitHub</a><br /><a href="http://www.beian.miit.gov.cn/" target="_blank">浙ICP备20009930号</a>',
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
