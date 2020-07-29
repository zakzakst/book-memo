import fireApp from '@/plugins/firebase'

export const state = () => ({
  settings: null,
  storageUrl: '',
})

export const mutations = {
  setSettings(state, payload) {
    state.settings = payload;
  },
  setStorageUrl(state, payload) {
    state.storageUrl = payload;
  }
}

export const actions = {
  updateSettings({commit}, payload) {
    fireApp.database().ref(`base/settings/${payload.id}`).set(payload.data)
      .then(() => {
        commit('setSettings', payload.data);
        console.log('設定データ更新');
        if(payload.storage) {
          return fireApp.storage().ref(`base/storage/${payload.id}`).put(payload.storage);
        } else {
          // return fireApp.storage().ref(`base/storage/${payload.id}`).delete();
        }
      })
      .then(() => {
        console.log('設定ストレージ更新');
      });
  },
  setSettings({commit}, payload) {
    fireApp.database().ref(`base/settings/${payload}`).on('value', snapshot => {
      commit('setSettings', snapshot.val());
      console.log('設定データセット');
    });
  },
  clearSettings({commit}) {
    commit('setSettings', null);
    console.log('設定データクリア');
  },
  setStorageUrl({commit}, payload) {
    fireApp.storage().ref().child(`base/storage/${payload}`).getDownloadURL()
      .then(url => {
        commit('setStorageUrl', url);
        console.log('設定ストレージセット');
      });
  },
  clearStorageUrl({commit}) {
    commit('setStorageUrl', null);
    console.log('設定ストレージクリア');
  }
}

export const getters = {
  settings(state) {
    return state.settings;
  },
  storageUrl(state) {
    return state.storageUrl;
  }
}
