import fireApp from '@/plugins/firebase'

export const state = () => ({
  settings: null,
})

export const mutations = {
  setSettings(state, payload) {
    state.settings = payload;
  }
}

export const actions = {
  updateSettings({commit}, payload) {
    fireApp.database().ref(`base/settings/${payload.id}`).set(payload.data)
      .then(() => {
        commit('setSettings', payload.data);
        console.log('設定更新');
      });
  },
  setSettings({commit}, payload) {
    fireApp.database().ref(`base/settings/${payload}`).on('value', snapshot => {
      commit('setSettings', snapshot.val());
      console.log('設定セット');
    });
  },
  clearSettings({commit}) {
    commit('setSettings', null);
    console.log('設定クリア');
  }
}

export const getters = {
  settings(state) {
    return state.settings;
  }
}
