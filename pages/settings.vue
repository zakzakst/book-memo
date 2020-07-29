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
            <label class="label">プロフィール画像</label>
            <div class="control">
              <div class="file has-name is-fullwidth">
                <label class="file-label">
                  <input @change="imageSelect" class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <fa :icon="['fa', 'upload']" />
                    </span>
                    <span class="file-label">ファイルを選択</span>
                  </span>
                  <span class="file-name">{{ imageName }}</span>
                </label>
              </div>
              <img :src="imageSrc" alt="">
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
      image: null,
      imageName: '',
      imageSrc: '',
    }
  },
  mixins: [
    settingsMixin
  ],
  methods: {
    imageSelect(e) {
      const file = e.target.files[0];
      this.imageName = file.name;
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file);
    },
    settingsUpdateSettings() {
      const data = {
        name: this.name,
        message: this.message,
        theme: this.theme || 'default'
      };
      this.updateSettings(data, this.image);
    }
  },
  watch: {
    settings(value) {
      this.name = value ? value.name : '';
      this.message = value ? value.message : '';
      this.theme = value ? value.theme : '';
    },
    storageUrl(value) {
      this.imageSrc = value || '';
    }
  }
}
</script>
