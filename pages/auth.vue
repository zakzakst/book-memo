<template>
  <div class="container">
    <section class="section">
      <div class="columns is-tablet is-centered">
        <div class="column is-half-tablet">
          <div class="tabs is-centered is-boxed">
            <ul>
              <li :class="{ 'is-active': formActive==='signIn' }"><a @click.prevent="formChange('signIn')" role="button">サインイン</a></li>
              <li :class="{ 'is-active': formActive==='signUp' }"><a @click.prevent="formChange('signUp')" role="button">新規登録</a></li>
            </ul>
          </div>
          <div class="field">
            <label class="label">メールアドレス</label>
            <div class="control has-icons-left">
              <input v-model="email" class="input" type="text" placeholder="base@mail.co.jp">
              <span class="icon is-left">
                <fa :icon="['fas', 'envelope']" />
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">パスワード</label>
            <div class="control has-icons-left">
              <input v-model="password" class="input" type="password" placeholder="password">
              <span class="icon is-left">
                <fa :icon="['fa', 'lock']" />
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button v-show="formActive==='signIn'" @click="authSignIn" class="button is-link is-fullwidth">サインイン</button>
              <button v-show="formActive==='signUp'" @click="authSignUp" class="button is-link is-fullwidth">新規登録</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import authMixin from '~/mixins/authMixin';

export default {
  data() {
    return {
      formActive: 'signIn',
      email: 'base@mail.co.jp',
      password: 'password'
    }
  },
  mixins: [
    authMixin
  ],
  methods: {
    formChange(type) {
      this.formActive = type;
    },
    authSignIn() {
      this.signIn(this.email, this.password);
    },
    authSignUp() {
      this.signUp(this.email, this.password);
    },
  }
}
</script>
