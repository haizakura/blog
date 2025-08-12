<template>
  <Layout>
    <template #doc-before v-if="currentPost">
      <div class="vp-doc">
        <h1>{{ currentPost.title }}</h1>
        <p class="mt-2 space-x-2">
          <Badge type="tip">{{ new Date(currentPost.create).toISOString().split('T')[0] }}</Badge>
          <Badge type="info" v-for="tag in currentPost.tags" :key="tag">{{ tag }}</Badge>
        </p>
      </div>
    </template>

    <template #doc-footer-before v-if="currentPost">
      <LicensingBlock />
    </template>

    <template #doc-after v-if="page.frontmatter.comment ?? true">
      <div class="VPDoc vp-doc">
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
import { ref, watch, onMounted, nextTick } from 'vue';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Giscus from '@giscus/vue';

import { data as posts } from '../posts.data';
import type { Post, ThemeConfig } from '.';
import LicensingBlock from '@/components/LicensingBlock.vue';

const { Layout } = DefaultTheme;
const { page, theme, isDark } = useData<ThemeConfig>();

onMounted(() => {
  watch(
    () => page.value.relativePath,
    async () => {
      // Wait for the next tick to make sure the component is mounted
      await nextTick();

      // Random tagline
      const taglineElem = document.querySelector('.tagline');
      if (taglineElem) {
        taglineElem.innerHTML =
          theme.value.taglines[Math.floor(Math.random() * theme.value.taglines.length)];
      }
    },
    { immediate: true }
  );
});

// Current post
const currentPost = ref<Post | undefined>(undefined);
watch(
  () => page.value.relativePath,
  (newPath) => {
    // Find current post
    const postId = newPath.match(/posts\/(.*)\//)?.[1];
    currentPost.value = postId ? posts.find((post) => post.id === postId) : undefined;
  },
  { immediate: true }
);
</script>
