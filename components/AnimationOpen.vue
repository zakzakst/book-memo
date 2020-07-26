<template>
  <div v-if="!pageOpen" class="anim-open">
    <p ref="openText" class="anim-open__text">HAVE FUN</p>
    <div class="anim-open__bg">
      <div class="anim-open__bg-item anim-open__bg-item--left"></div>
      <div class="anim-open__bg-item anim-open__bg-item--right"></div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  methods: {
    openTextSplit(text) {
      const innerText = text.innerText;
      const splitText = innerText.replace(/(\S)/g, '<span>$1</span>');
      text.innerHTML = splitText;
      return text;
    },
    openAnim() {
      console.log('オープンアニメーション');
      const animText = this.$refs.openText;
      this.openTextSplit(animText);

      const self = this;
      const tl = gsap.timeline({
        onComplete() {
          self.$store.commit('animation/setPageOpen', true);
        }
      });
      tl.to(animText.children, {
        delay: 1,
        duration: 0.5,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'back.out(4)',
        stagger: {
          each: 0.1,
        }
      }).to(animText, {
        delay: 0.3,
        duration: 0.5,
        opacity: 0,
        scale: 0.5,
        ease: 'back.in',
      }).to('.anim-open__bg-item', {
        delay: 0.6,
        duration: 0.4,
        width: 0,
        ease: 'power4.in',
      });
    },
  },
  mounted() {
    if(!this.pageOpen) {
      this.openAnim();
    }
  },
  computed: {
    pageOpen() {
      return this.$store.getters['animation/pageOpen'];
    }
  }
}
</script>

<style lang="scss">
.anim-open {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  z-index: $z--anim-open;
}
.anim-open__text {
  position: relative;
  color: var(--theme-anim-text);
  font-weight: bold;
  z-index: $z--anim-open-text;
  font-size: 8vw;
  & > span {
    position: relative;
    display: inline-block;
    opacity: 0;
    transform: translateY(20px) scale(0.5);
  }
}
.anim-open__bg {
  position: absolute;
  width: 142vmax;
  height: 142vmax;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  z-index: $z--anim-open-bg;
}
.anim-open__bg-item {
  position: absolute;
  width: calc(50% + 1px);
  height: 100%;
  top: 0;
  bottom: 0;
  background: var(--theme-anim-bg);
}
.anim-open__bg-item--left {
  left: 0;
}
.anim-open__bg-item--right {
  right: 0;
}
</style>
