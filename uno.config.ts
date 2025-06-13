import { defineConfig, presetUno } from 'unocss';

/**
 * 将给定名称与一系列级别组合成带级别的名称数组
 * 
 * @param name 基础名称 用于与每个级别组合
 * @param levels 级别数组 表示需要与基础名称组合的各个级别
 * @returns 返回一个新的字符串数组 每个元素都是基础名称加上一个级别后缀
 */
function withLevels(name: string, levels: any[]) {
  return levels.map((suffix) => `${name}-${suffix}`);
}

/**
 * 将给定的颜色名称数组转换为对应的CSS变量颜色映射
 * CSS变量字符串的格式为`var(--vp-c-${name})`
 * `${name}`是数组中的颜色名称
 * 
 * @param names 颜色名称数组 用于生成CSS变量颜色映射
 * @returns 返回一个对象 key是颜色名称 value是对应的CSS变量字符串
 */
function vpColors(names: string[]) {
  const colors: Record<string, string> = {};
  for (const name of names) {
    // 为每个颜色名称在colors对象中创建一个键值对
    colors[name] = `var(--vp-c-${name})`;
  }
  return colors;
}

/**
 * 根据按钮变体生成颜色主题
 * 
 * 针对给定的按钮变体
 * 生成一个包含该变体在不同状态下的颜色主题对象
 * 为按钮的 文本 背景 边框颜色 定义了 正常 悬停 激活 状态下的CSS变量
 * 
 * @param variant 按钮的变体名称
 * @returns 返回一个对象 key是颜色主题的名称 value是对应的CSS变量
 */
function vpButtonColors(variant: string) {
  const colors: Record<string, string> = {};
  for (const target of ['text', 'bg', 'border']) {
    // 正常状态
    colors[`button-${variant}-${target}`] = `var(--vp-button-${variant}-${target})`;
    // 悬停状态
    colors[`button-${variant}-hover-${target}`] = `var(--vp-button-${variant}-hover-${target})`;
    // 激活状态
    colors[`button-${variant}-active-${target}`] = `var(--vp-button-${variant}-active-${target})`;
  }
  return colors;
}

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      ...vpColors([
        // Colors: Solid
        'white',
        'black',
        'neutral',
        'neutral-inverse',

        // Colors: Palette
        ...withLevels('gray', [1, 2, 3, 'soft']),
        ...withLevels('indigo', [1, 2, 3, 'soft']),
        ...withLevels('purple', [1, 2, 3, 'soft']),
        ...withLevels('green', [1, 2, 3, 'soft']),
        ...withLevels('yellow', [1, 2, 3, 'soft']),
        ...withLevels('red', [1, 2, 3, 'soft']),
        'sponsor',

        // Colors: Background
        'bg',
        ...withLevels('bg', ['alt', 'elv', 'soft']),

        // Colors: Borders
        'border',
        'divider',
        'gutter',

        // Colors: Text
        ...withLevels('text', [1, 2, 3]),

        // Colors: Function
        ...withLevels('default', [1, 2, 3, 'soft']),
        ...withLevels('brand', [1, 2, 3, 'soft']),
        ...withLevels('tip', [1, 2, 3, 'soft']),
        ...withLevels('note', [1, 2, 3, 'soft']),
        ...withLevels('success', [1, 2, 3, 'soft']),
        ...withLevels('important', [1, 2, 3, 'soft']),
        ...withLevels('warning', [1, 2, 3, 'soft']),
        ...withLevels('danger', [1, 2, 3, 'soft']),
        ...withLevels('caution', [1, 2, 3, 'soft']),
      ]),
      // Colors: Buttons
      ...vpButtonColors('brand'),
      ...vpButtonColors('alt'),
    },
    fontFamily: {
      base: 'var(--vp-font-family-base)',
      mono: 'var(--vp-font-family-mono)',
    },
  },
});
