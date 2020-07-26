<template>
  <div ref="animPage" class="anim-page">
    <div class="anim-page__bg">
      <div class="anim-page__bg-item anim-page__bg-item--left">
        <div></div>
      </div>
      <div class="anim-page__bg-item anim-page__bg-item--right">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  methods: {
    enterAnim() {
      console.log('コンポーネントアニメーション：ページ遷移前');
      const tl = gsap.timeline();
      tl.set(this.$refs.animPage, {
        display: 'block'
      })
      .to('.anim-page__bg-item > div', {
        duration: 0.4,
        height: '100%',
        ease: 'power4.in'
      })
      .to('.anim-page__bg-item > div', {
        delay: 0.2,
        duration: 0.4,
        width: '100%',
        ease: 'power4.in',
      });
    },
    leaveAnim() {
      console.log('コンポーネントアニメーション：ページ遷移後');
      const tl = gsap.timeline();
      tl.to('.anim-page__bg-item > div', {
        duration: 0.4,
        x: i => {
          return `${Math.pow(-1, i) * -100}%`;
        },
        ease: 'power4.in'
      })
      .set([this.$refs.animPage, '.anim-page__bg-item > div'], {
        clearProps: 'all'
      });
    }
  },
  computed: {
    pageEnter() {
      return this.$store.getters['animation/pageEnter'];
    }
  },
  watch: {
    pageEnter(value) {
      if(value) {
        this.enterAnim();
      } else {
        this.leaveAnim();
      }
    },
  },
}
</script>

<style lang="scss">
.anim-page {
  position: fixed;
  display: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z--anim-page;
}
.anim-page__bg {
  position: absolute;
  width: 142vmax;
  height: 142vmax;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  z-index: $z--anim-page-bg;
}
.anim-page__bg-item {
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  bottom: 0;
  & > div {
    position: absolute;
    width: 2px;
    height: 0;
    top: 50%;
    background: var(--theme-anim-bg);
    transform: translateY(-50%);
  }
}
.anim-page__bg-item--left {
  left: 0;
  & > div {
    right: -1px;
  }
}
.anim-page__bg-item--right {
  right: 0;
  & > div {
    left: -1px;
  }
}
</style>
