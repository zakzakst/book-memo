<template>
  <div class="container">
    <section class="section">
      <div class="columns is-tablet is-centered">
        <div class="column is-half-tablet">
          <div class="field">
            <label class="label">名前</label>
            <div class="control">
              <input v-model="name" class="input" type="text" placeholder="山田 太郎">
            </div>
          </div>
          <div class="field">
            <label class="label">メッセージ</label>
            <div class="control">
              <textarea v-model="message" class="textarea" placeholder="項目の内容"></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">テーマ</label>
            <div class="control">
              <label class="radio">
                <input type="radio" value="default" v-model="theme">通常
              </label>
              <label class="radio">
                <input type="radio" value="yellow" v-model="theme">黄色
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button @click="settingsUpdateSettings" class="button is-link is-fullwidth">設定更新</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import settingsMixin from '~/mixins/settingsMixin';

export default {
  data() {
    return {
      name: '',
      message: '',
      theme: '',
    }
  },
  mixins: [
    settingsMixin
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
  watch: {
    settings(value) {
      this.name = value ? value.name : '';
      this.message = value ? value.message : '';
      this.theme = value ? value.theme : '';
    }
  }
}
</script>
