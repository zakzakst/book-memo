<template>
  <div class="container">
    <section class="section">
      <div class="content has-text-centered">
        <p v-if="error.statusCode === 404">ページが見つかりません</p>
        <p v-else>エラーが発生しました</p>
        <nuxt-link to="/" class="button">トップページに戻る</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
