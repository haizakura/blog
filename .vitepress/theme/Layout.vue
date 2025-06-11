<template>
  <Layout>
    <template #doc-after v-if="page.frontmatter.comment ?? true">
      <div>
        <h2 id="giscus">评论</h2>
      </div>
      <Giscus
        id="giscus"
        :key="page.relativePath"
        v-bind="theme.giscus"
        :theme="isDark ? 'transparent_dark' : 'light'"
      />
    </template>
 </Layout>
</template>

<script setup lang="ts"> 
import { ref, nextTick, watch, onMounted, computed } from 'vue';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Giscus from '@giscus/vue'

// import { data as posts } from '../posts.data';
import type { ThemeConfig } from '.';

const { Layout } = DefaultTheme;
const { page, theme, frontmatter, isDark } = useData<ThemeConfig>();
</script>
