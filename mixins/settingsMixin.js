export default {
  methods: {
    updateSettings(data) {
      const settingsData = {
        id: this.id,
        data: data
      }
      this.$store.dispatch('settings/updateSettings', settingsData);
    },
  },
  created() {
    if(!this.settings && this.id) {
      this.$store.dispatch('settings/setSettings', this.id);
    }
  },
  computed: {
    settings() {
      return this.$store.getters['settings/settings'];
    },
    id() {
      return this.$store.getters['auth/id'];
    }
  },
  watch: {
    id(value) {
      if(value) {
        this.$store.dispatch('settings/setSettings', this.id);
      } else {
        this.$store.dispatch('settings/clearSettings');
      }
    }
  }
}
