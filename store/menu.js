export const state = () => ({
  menuOpen: false,
})

export const mutations = {
  setMenuOpen(state, payload) {
    state.menuOpen = payload;
  },
}

export const getters = {
  menuOpen(state) {
    return state.menuOpen;
  },
}
