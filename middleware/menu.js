export default function ({ store }) {
  if (store.state.menu.menuOpen) {
    return store.commit('menu/setMenuOpen', false);
  }
}
