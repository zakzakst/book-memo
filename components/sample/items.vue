<template>
  <section>
    <h2>Items</h2>
    <p>key：<input type="text" v-model="key"></p>
    <p>title：<input type="text" v-model="title"></p>
    <p>text：<input type="text" v-model="text"></p>
    <p>
      <button @click.prevent="itemsCreateItem">項目作成</button>
      <button @click.prevent="itemsUpdateItem">項目更新</button>
      <button @click.prevent="itemsDeleteItem">項目削除</button>
    </p>
    <ul v-if="items">
      <li v-for="item in items" :key="item.key">
        キー：{{ item.key }}<br>
        タイトル：{{ item.data.title }}<br>
        テキスト：{{ item.data.text }}<br>
      </li>
    </ul>
  </section>
</template>

<script>
import itemsMixin from '~/mixins/itemsMixin';

export default {
  data() {
    return {
      key: '',
      title: '',
      text: ''
    }
  },
  mixins: [
    itemsMixin
  ],
  methods: {
    itemsCreateItem() {
      const data = {
        title: this.title,
        text: this.text
      };
      this.createItem(data);
    },
    itemsUpdateItem() {
      const data = {
        title: this.title,
        text: this.text
      };
      this.updateItem(this.key, data);
    },
    itemsDeleteItem() {
      this.deleteItem(this.key);
    }
  }
}
</script>
