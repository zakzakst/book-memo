<template>
  <div>
    <p class="sample__text">共通スタイル</p>
    <div class="sample-component">
      <p class="sample-component__text">コンポーネント用スタイル</p>
    </div>
    <p class="theme__element">テーマ：通常</p>
    <div class="theme--yellow">
      <p class="theme__element">テーマ：黄色</p>
      <p class="theme-component__element">コンポーネント用スタイル（テーマ：黄色）</p>
    </div>
  </div>
</template>

<style lang="scss">
.sample-component {
  &__text {
    color: $color-text--sample2;
  }
}
.theme-component__element {
  color: $color-text--sample2;
  background-color: var(--theme-bg);
}
</style>
