<template>
  <div class="theme--yellow">
    <animation-open />
    <animation-page />
    <Nuxt />
  </div>
</template>

<script>
import AnimationOpen from '~/components/AnimationOpen.vue'
import AnimationPage from '~/components/AnimationPage.vue'

export default {
  components: {
    AnimationOpen,
    AnimationPage,
  }
}
</script>

<style scoped>
</style>
