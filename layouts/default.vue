<template>
  <div :class="[themeClass, $style.body]">
    <!-- <animation-open /> -->
    <!-- <animation-page /> -->
    <div :class="$style.header">
      <my-header />
    </div>
    <div :class="$style.content">
      <Nuxt />
    </div>
    <div :class="$style.footer">
      <my-footer />
    </div>
  </div>
</template>

<script>
import settingsMixin from '~/mixins/settingsMixin';
// import AnimationOpen from '~/components/AnimationOpen.vue';
// import AnimationPage from '~/components/AnimationPage.vue';
import MyHeader from '~/components/Header.vue';
import MyFooter from '~/components/Footer.vue';

export default {
  data() {
    return {
      themeClass: ''
    }
  },
  components: {
    // AnimationOpen,
    // AnimationPage,
    MyHeader,
    MyFooter,
  },
  mixins: [
    settingsMixin
  ],
  watch: {
    settings(value) {
      this.themeClass = value ? `theme--${value.theme}` : '';
    }
  },
}
</script>

<style lang="scss" module>
.body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
}
.content {
  padding-top: 52px;
  flex-grow: 1;
  z-index: 1;
}
@media screen and (min-width: 1024px) {
  .content {
    padding-top: 56px;
  }
}
</style>
