// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import { DefaultTheme as DefaultThemeType, Theme, ContentData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { GiscusProps } from '@giscus/vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme;

export interface ThemeConfig extends DefaultThemeType.Config { 
  giscus?: GiscusProps;
};
