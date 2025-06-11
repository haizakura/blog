<template>
  <div v-for="year in years" :key="year.year">
    <h2 :id="year.year.toString()">{{ year.year }}</h2>
    <div
      v-for="post in year.posts"
      :key="post.id"
      class="pa-4 not-last:border-b not-last:border-b-divider not-last:border-b-solid"
    >
      <a
        :href="getPostHref(post.id)"
        class="block important:decoration-none important:text-text-1 important:hover:text-brand-1 text-xl"
      >
        {{ post.title }}
      </a>
      <p class="mt-2 space-x-2">
        <Badge type="tip">{{ new Date(post.create).toISOString().split('T')[0] }}</Badge>
        <Badge type="info" v-for="tag in post.tags" :key="tag">{{ tag }}</Badge>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import { data as posts } from '@/.vitepress/posts.data';
import type { Post } from '@/.vitepress/theme';

const years: { year: number; posts: Post[] }[] = [];

for (const post of posts) {
  const year = new Date(post.create).getFullYear();
  let yearIndex = years.find((item) => item.year === year);
  if (!yearIndex) {
    yearIndex = { year, posts: [] };
    years.push(yearIndex);
  }
  yearIndex.posts.push(post);
}

const { site } = useData();

function getPostHref(id: string) {
  return `${site.value.base}posts/${id}/`;
}
</script>
