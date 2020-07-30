export default {
  methods: {
    signUp(email, password) {
      const data = {
        email: email,
        password: password
      };
      this.$store.dispatch('auth/signup', data);
    },
    signIn(email, password) {
      const data = {
        email: email,
        password: password
      };
      this.$store.dispatch('auth/signin', data);
    },
    signOut() {
      this.$store.dispatch('auth/signout');
    }
  },
  created() {
    if(!this.id) {
      this.$store.dispatch('auth/setId');
    }
  },
  computed: {
    id() {
      return this.$store.getters['auth/id'];
    },
    signInBusy() {
      return this.$store.getters['auth/signInBusy'];
    },
  }
}
