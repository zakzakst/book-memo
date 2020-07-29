<template>
  <div class="container">
    <section class="section">
      <div class="columns is-tablet is-centered">
        <div class="column is-half-tablet">
          <div v-if="searchData" class="columns is-multiline">
            <div v-for="data in searchData" :key="data.id" class="column is-12">
              <div class="box">
                <article class="media">
                  <div class="media-left">
                    <img :src="data.image" alt="">
                  </div>
                  <div class="media-content">
                    <h3 class="is-size-5">{{ data.title }}</h3>
                    <p>{{ data.description }}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div v-else><progress class="progress is-small is-primary" max="100">データ取得中</progress></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: null
    }
  },
  methods: {
    async getSearchResult(text) {
      const data = await this.$axios.$get(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
      this.searchData = this.arrangeData(data);
    },
    arrangeData(data) {
      const newData = data.items.map(item => {
        const itemData = {
          id: item.id,
          title: item.volumeInfo.title,
          description: item.volumeInfo.description,
          authors: item.volumeInfo.authors,
          publisher: item.volumeInfo.publisher,
          image: item.volumeInfo.imageLinks.smallThumbnail,
        };
        return itemData;
      });
      return newData;
    }
  },
  created() {
    const searchText = this.$route.query.text;
    this.getSearchResult(searchText);
  },
  computed: {
    query() {
      return this.$route.query.text;
    }
  },
  watch: {
    query(value) {
      this.getSearchResult(value);
    }
  },
  head () {
    return {
      title: `検索結果｜${this.$route.query.text}`,
      meta: [
        { hid: 'description', name: 'description', content: '検索結果を表示するページ' }
      ]
    }
  }
}
</script>
