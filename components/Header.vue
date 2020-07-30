<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </nuxt-link>
        <a v-if="id" @click.prevent="menuToggle" :class="{ 'is-active': menuOpen }" class="navbar-burger burger" role="button">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div v-if="id" :class="{ 'is-active': menuOpen }" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link v-for="(link, index) in links" :key="index" :to="link.to" class="navbar-item">{{ link.label }}</nuxt-link>
        </div>

        <div class="navbar-end">
          <a @click="authsignOut" class="navbar-item" role="button">サインアウト</a>
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control has-icons-left">
                <input v-model="searchText" class="input" type="text" placeholder="キーワード">
                <span class="icon is-left">
                  <fa :icon="['fas', 'search']" />
                </span>
              </div>
              <div class="control">
                <button @click="search" class="button is-info">検索</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import authMixin from '~/mixins/authMixin';

export default {
  data() {
    return {
      // menuActive: false,
      links: [
        {
          label: 'トップ',
          to: '/',
        },
        {
          label: '項目一覧',
          to: '/items',
        },
        {
          label: '設定',
          to: '/settings',
        },
      ],
      searchText: ''
    }
  },
  mixins: [
    authMixin
  ],
  methods: {
    menuToggle() {
      // this.menuActive = !this.menuActive;
      this.$store.commit('menu/setMenuOpen', !this.menuOpen);
    },
    search() {
      const searchText = this.searchText;
      this.searchText = '';
      this.$router.push(`/search?text=${searchText}`);
    },
    authsignOut() {
      this.signOut();
      const self = this;
      this.$toast.show('サインアウト完了', {
        theme: 'bubble',
        position: 'top-center',
        duration: 1000,
        onComplete() {
          self.$router.push('/auth');
        }
      });
    },
  },
  computed: {
    menuOpen() {
      return this.$store.getters['menu/menuOpen'];
    },
  }
}
</script>
