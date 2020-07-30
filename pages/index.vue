<template>
  <div class="container">
    <section class="section">
      <div class="columns is-tablet is-centered">
        <div class="column is-half-tablet">
          <h1 class="title">{{ name }}</h1>
          <p class="subtitle">{{ message }}</p>
          <p v-if="storageUrl">
            <img :src="storageUrl" alt="プロフィール画像">
          </p>
        </div>
      </div>
      <div class="columns is-tablet is-centered">
        <div class="column is-half-tablet">
          <div v-for="item in limitItems" :key="item.key" class="column is-12">
            <div class="card">
              <div class="card-content">
                <h3 class="is-size-5">{{ item.data.title }}</h3>
                <p>{{ item.data.text }}</p>
              </div>
            </div>
          </div>
          <div>
            <nuxt-link to="/items" class="button is-link is-fullwidth">もっと見る</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import settingsMixin from '~/mixins/settingsMixin';
import itemsMixin from '~/mixins/itemsMixin';

export default {
  data() {
    return {
      name: '',
      message: '',
      theme: '',
      itemsLimitNum: 3,
    }
  },
  mixins: [
    settingsMixin,
    itemsMixin
  ],
  methods: {
    settingsUpdateSettings() {
      const data = {
        name: this.name,
        message: this.message,
        theme: this.theme || 'default'
      }
      this.updateSettings(data);
    }
  },
  computed: {
    limitItems() {
      const reverseArr = [];
      for(let i = this.items.length; i > 0; i--) {
        reverseArr.push(this.items[i - 1]);
      }
      return reverseArr.slice(0, this.itemsLimitNum);
    }
  },
  watch: {
    settings(value) {
      this.name = value ? value.name : '';
      this.message = value ? value.message : '';
      this.theme = value ? value.theme : '';
    }
  }
}
</script>
