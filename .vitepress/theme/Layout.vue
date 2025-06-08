<template>
    <!-- 渲染默认主题内容 -->
    <VPThemeLayout>
        <slot />
    </VPThemeLayout>

    <!-- Vercel性能监控脚本 -->
    <SpeedInsights />
</template>

<script lang="ts" setup>
import { default as VPThemeLayout } from 'vitepress/theme/Layout.vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>
