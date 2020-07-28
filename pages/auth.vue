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
              <input name="email" v-model="email" class="input" type="text" placeholder="base@mail.co.jp" v-validate="'required|min:4'" :class="{ 'is-danger': errors.has('email') }">
              <span class="icon is-left">
                <fa :icon="['fas', 'envelope']" />
              </span>
            </div>
            <p v-show="errors.has('email')" class="has-text-danger is-size-7">必須項目です。メールアドレスを入力してください</p>
          </div>
          <div class="field">
            <label class="label">パスワード</label>
            <div class="control has-icons-left">
              <input name="password" v-model="password" class="input" type="password" placeholder="password" v-validate="'required|min:6'" :class="{ 'is-danger': errors.has('password') }">
              <span class="icon is-left">
                <fa :icon="['fa', 'lock']" />
              </span>
            </div>
            <p v-show="errors.has('email')" class="has-text-danger is-size-7">必須項目です。6文字以上のパスワードを入力してください</p>
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
      email: '',
      password: ''
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
      this.$validator.validateAll()
        .then(result => {
          if(result) {
            this.signIn(this.email, this.password);
          }
        });
    },
    authSignUp() {
      this.$validator.validateAll()
        .then(result => {
          if(result) {
            this.signUp(this.email, this.password);
          }
        });
    },
  }
}
</script>
