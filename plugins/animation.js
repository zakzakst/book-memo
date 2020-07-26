export default async ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if(!from.name) {
      next();
      return;
    }
    console.log('アニメーション：ページ遷移前');
    store.commit('animation/setPageEnter', true);
    setTimeout(() => {
      next();
    }, 2000);
  });
  app.router.afterEach((to, from) => {
    console.log('アニメーション：ページ遷移後');
    store.commit('animation/setPageEnter', false);
  });
};
