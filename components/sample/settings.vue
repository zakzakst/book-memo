<template>
  <div>
  <section>
    <h2>Settings</h2>
    <p>name：<input type="text" v-model="name"></p>
    <p>message：<input type="text" v-model="message"></p>
    <p>
      <button @click.prevent="settingsUpdateSettings">設定更新</button>
    </p>
    <p v-if="settings">
      名前：{{ settings.name }}<br>
      メッセージ：{{ settings.message }}<br>
    </p>
  </section>
  </div>
</template>

<script>
import settingsMixin from '~/mixins/settingsMixin';

export default {
  data() {
    return {
      name: '',
      message: ''
    }
  },
  mixins: [
    settingsMixin
  ],
  methods: {
    settingsUpdateSettings() {
      const data = {
        name: this.name,
        message: this.message
      }
      this.updateSettings(data);
    }
  }
}
</script>
