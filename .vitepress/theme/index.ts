// https://vitepress.dev/guide/custom-theme
import { DefaultTheme as DefaultThemeType, Theme, ContentData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { GiscusProps } from '@giscus/vue';
import Layout from './Layout.vue';

import '@catppuccin/vitepress/theme/mocha/mauve.css';
import './custom.sass';

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};

export default theme;

export interface ThemeConfig extends DefaultThemeType.Config {
  siteBase: string;
  author: string;
  license: string;
  licenseLink: string;
  // taglines: string[]
  giscus: GiscusProps;
}

export interface Post extends ContentData {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  create: number;
}
