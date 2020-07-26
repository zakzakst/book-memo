<template>
  <section>
    <h2>Auth</h2>
    <p>ログイン状態：{{ id ? id : '未ログイン' }}</p>
    <p>email：<input type="text" v-model="email"></p>
    <p>password：<input type="text" v-model="password"></p>
    <p>
      <button @click.prevent="authSignUp">サインアップ</button>
      <button @click.prevent="authSignIn">サインイン</button>
      <button @click.prevent="authsignOut">サインアウト</button>
    </p>
  </section>
</template>

<script>
import authMixin from '~/mixins/authMixin';

export default {
  data() {
    return {
      email: 'base@mail.co.jp',
      password: 'password'
    }
  },
  mixins: [
    authMixin
  ],
  methods: {
    authSignUp() {
      this.signUp(this.email, this.password);
    },
    authSignIn() {
      this.signIn(this.email, this.password);
    },
    authsignOut() {
      this.signOut();
    }
  }
}
</script>
