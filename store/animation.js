export const state = () => ({
  pageOpen: false,
  pageEnter: false,
})

export const mutations = {
  setPageOpen(state, payload) {
    state.pageOpen = payload;
  },
  setPageEnter(state, payload) {
    state.pageEnter = payload;
  },
}

export const getters = {
  pageOpen(state) {
    return state.pageOpen;
  },
  pageEnter(state) {
    return state.pageEnter;
  }
}
