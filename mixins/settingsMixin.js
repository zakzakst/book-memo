export default {
  methods: {
    updateSettings(data, storage) {
      const settingsData = {
        id: this.id,
        data: data,
        storage: storage,
      }
      this.$store.dispatch('settings/updateSettings', settingsData);
    },
  },
  created() {
    if(this.id) {
      this.$store.dispatch('settings/setSettings', this.id);
    }
  },
  computed: {
    settings() {
      return this.$store.getters['settings/settings'];
    },
    storageUrl() {
      return this.$store.getters['settings/storageUrl'];
    },
    id() {
      return this.$store.getters['auth/id'];
    }
  },
  watch: {
    id(value) {
      if(value) {
        this.$store.dispatch('settings/setSettings', this.id);
        this.$store.dispatch('settings/setStorageUrl', this.id);
      } else {
        this.$store.dispatch('settings/clearSettings');
        this.$store.dispatch('settings/clearStorageUrl');
      }
    }
  }
}
