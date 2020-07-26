export default {
  methods: {
    createItem(data) {
      const itemData = {
        id: this.id,
        data: data
      };
      this.$store.dispatch('items/createItem', itemData);
    },
    updateItem(key, data) {
      const itemData = {
        id: this.id,
        key: key,
        data: data
      };
      this.$store.dispatch('items/updateItem', itemData);
    },
    deleteItem(key) {
      const itemData = {
        id: this.id,
        key: key
      };
      this.$store.dispatch('items/deleteItem', itemData);
    }
  },
  created() {
    if(!this.items && this.id) {
      this.$store.dispatch('items/readItems', this.id);
    }
  },
  computed: {
    items() {
      return this.$store.getters['items/items'];
    },
    id() {
      return this.$store.getters['auth/id'];
    }
  },
  watch: {
    id(value) {
      if(value) {
        this.$store.dispatch('items/readItems', this.id);
      } else {
        this.$store.dispatch('items/clearItems');
      }
    }
  }
}
