<template>
  <div :class="themeClass">
    <!-- <animation-open /> -->
    <animation-page />
    <my-header />
    <Nuxt />
    <my-footer />
  </div>
</template>

<script>
import settingsMixin from '~/mixins/settingsMixin';
import AnimationOpen from '~/components/AnimationOpen.vue';
import AnimationPage from '~/components/AnimationPage.vue';
import MyHeader from '~/components/Header.vue';
import MyFooter from '~/components/Footer.vue';

export default {
  data() {
    return {
      themeClass: ''
    }
  },
  components: {
    AnimationOpen,
    AnimationPage,
    MyHeader,
    MyFooter,
  },
  mixins: [
    settingsMixin
  ],
  watch: {
    settings(value) {
      this.themeClass = `theme--${value.theme}`;
    }
  }
}
</script>

<style scoped>
</style>
