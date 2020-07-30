<template>
  <div class="container">
    <section class="section">
      <div class="columns is-tablet is-centered">
        <div class="column is-half-tablet">
          <div v-if="items" class="columns is-multiline">
            <div class="column">
              <div class="field">
                <label class="label">タイトル</label>
                <div class="control">
                  <input v-model="createTitle" class="input" type="text" placeholder="項目のタイトル">
                </div>
              </div>
              <div class="field">
                <label class="label">テキスト</label>
                <div class="control">
                  <textarea v-model="createText" class="textarea" placeholder="項目の内容"></textarea>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button @click="itemsCreateItem" class="button is-link is-fullwidth">項目作成</button>
                </div>
              </div>
            </div>
            <transition-group name="items">
              <div v-for="item in limitItems" :key="item.key" class="column is-12">
                <div class="card">
                  <div class="card-content">
                    <h3 class="is-size-5">{{ item.data.title }}</h3>
                    <p>{{ item.data.text }}</p>
                  </div>
                  <div class="card-footer">
                    <a @click.prevent="showUpdateModal" :href="item.key" class="card-footer-item" role="button">編集</a>
                    <a @click.prevent="itemsDeleteItem" :href="item.key" class="card-footer-item" role="button">削除</a>
                  </div>
                </div>
              </div>
            </transition-group>
            <div class="modal" :class="{ 'is-active': upDateModalActive }">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">項目の編集</p>
                  <button @click="hideUpdateModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                  <div class="field">
                    <label class="label">タイトル</label>
                    <div class="control">
                      <input v-model="upDateTitle" class="input" type="text" placeholder="項目のタイトル">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">テキスト</label>
                    <div class="control">
                      <textarea v-model="upDateText" class="textarea" placeholder="項目の内容"></textarea>
                    </div>
                  </div>
                </section>
                <footer class="modal-card-foot">
                  <button @click="itemsUpdateItem" class="button is-success">更新</button>
                  <button @click="hideUpdateModal" class="button">キャンセル</button>
                </footer>
              </div>
            </div>
            <nav class="pagination is-centered" role="navigation" aria-label="pagination" :class="$style.pagination">
              <a class="pagination-previous" :disabled="itemsCurrentPos === 1">＜</a>
              <a class="pagination-next" :disabled="itemsCurrentPos === limitButtons">＞</a>
              <ul class="pagination-list">
                <li v-for="n in limitButtons" :key="n">
                  <nuxt-link :to="`/items?page=${n}`" class="pagination-link" :class="{'is-current': n === itemsCurrentPos}">{{ n }}</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import itemsMixin from '~/mixins/itemsMixin';

export default {
  data() {
    return {
      createTitle: '',
      createText: '',
      upDateModalActive: false,
      upDateKey: '',
      upDateTitle: '',
      upDateText: '',
      itemsLimitNum: 5,
    }
  },
  mixins: [
    itemsMixin
  ],
  methods: {
    clearCreateForm() {
      this.createTitle = '';
      this.createText = '';
    },
    showUpdateModal(e) {
      const itemKey = e.target.getAttribute('href');
      let item = {};
      const items = this.$store.getters['items/items'];
      for(let i = 0; i < items.length; i++) {
        if(items[i].key === itemKey) {
          item = items[i];
          break;
        }
      }
      this.upDateModalActive = true;
      this.upDateKey = item.key;
      this.upDateTitle = item.data.title;
      this.upDateText = item.data.text;
    },
    hideUpdateModal() {
      this.upDateModalActive = false;
      this.upDateKey = '';
      this.upDateTitle = '';
      this.upDateText = '';
    },
    itemsCreateItem() {
      const data = {
        title: this.createTitle,
        text: this.createText
      };
      this.createItem(data);
      this.clearCreateForm();
    },
    itemsUpdateItem() {
      const data = {
        title: this.upDateTitle,
        text: this.upDateText
      };
      this.updateItem(this.upDateKey, data);
      this.hideUpdateModal();
    },
    itemsDeleteItem(e) {
      const itemKey = e.target.getAttribute('href');
      this.deleteItem(itemKey);
    },
  },
  computed: {
    limitItems() {
      const itemsStart = (this.itemsCurrentPos - 1) * this.itemsLimitNum + 1 - 1;
      const reverseArr = [];
      for(let i = this.items.length; i > 0; i--) {
        reverseArr.push(this.items[i - 1]);
      }
      return reverseArr.slice(itemsStart, itemsStart + this.itemsLimitNum);
    },
    itemsLength() {
      return this.items.length;
    },
    itemsCurrentPos() {
      return Number(this.$route.query.page || 1);
    },
    limitButtons() {
      return Math.ceil(this.items.length / this.itemsLimitNum);
    }
  },
  head () {
    return {
      title: '項目ページ',
      meta: [
        { hid: 'description', name: 'description', content: '項目を登録・編集・削除するページ' }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.pagination {
  margin: 0 auto;
}
</style>
