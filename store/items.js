import fireApp from '@/plugins/firebase'

export const state = () => ({
  items: [],
})

export const mutations = {
  setItem(state, payload) {
    state.items.push(payload);
  },
  updateItem(state, payload) {
    for(let i = 0; i < state.items.length; i++) {
      const item = state.items[i];
      if(item.key === payload.key) {
        item.data = payload.data;
        break;
      }
    }
  },
  deleteItem(state, payload) {
    for(let i = 0; i < state.items.length; i++) {
      const item = state.items[i];
      if(item.key === payload.key) {
        state.items.splice(i, 1);
        break;
      }
    }
  },
  clearItems(state) {
    state.items = [];
  }
}

export const actions = {
  createItem({commit}, payload) {
    if(!payload.id) {console.log('idが設定されてない'); return;}
    fireApp.database().ref(`base/items/${payload.id}`).push(payload.data)
      .then(() => {
        console.log('項目作成');
      })
      .catch(error => {
        console.log(error);
      });
  },
  readItems({commit}, payload) {
    fireApp.database().ref(`base/items/${payload}`).on('child_added', snapshot => {
      const item = {
        key: snapshot.key,
        data: snapshot.val()
      };
      commit('setItem', item);
      console.log('項目セット');
    });
  },
  updateItem({commit}, payload) {
    fireApp.database().ref(`base/items/${payload.id}/${payload.key}`).update(payload.data)
      .then(() => {
        commit('updateItem', payload);
        console.log('項目更新');
      })
      .catch(error => {
        console.log(error);
      })
  },
  deleteItem({commit}, payload) {
    fireApp.database().ref(`base/items/${payload.id}/${payload.key}`).remove()
      .then(() => {
        commit('deleteItem', payload);
        console.log('項目削除');
      })
      .catch(error => {
        console.log(error);
      })
  },
  clearItems({commit}) {
    commit('clearItems');
    console.log('項目クリア');
  }
}

export const getters = {
  items(state) {
    return state.items;
  }
}
