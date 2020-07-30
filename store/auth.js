import fireApp from '@/plugins/firebase'

export const state = () => ({
  id: null,
  signInBusy: false,
})

export const mutations = {
  setId(state, payload) {
    state.id = payload;
  },
  setSignInBusy(state, payload) {
    state.signInBusy = payload;
  }
}

export const actions = {
  signup({commit}, payload) {
    commit('setSignInBusy', true);
    let userId = null;
    fireApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        userId = data.user.uid;
        const userData = {
          email: payload.email,
          createdAt: new Date().toISOString(),
        };
        return fireApp.database().ref(`base/users/${userId}`).set(userData);
      })
      .then(() => {
        commit('setId', userId);
        commit('setSignInBusy', false);
        // this.$router.push('/');
        console.log('サインアップ');
      })
      .catch(error => {
        console.log(error);
      });
  },
  signin({commit}, payload) {
    commit('setSignInBusy', true);
    fireApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('setSignInBusy', false);
        // this.$router.push('/');
        console.log('サインイン');
      })
      .catch(error => {
        console.log(error);
      });
  },
  signout({commit}) {
    fireApp.auth().signOut()
      .then(() => {
        this.$router.push('/auth');
        setTimeout(() => {
          commit('setId', null);
          console.log('サインアウト');
        }, 500);
      })
      .catch(error => {
        console.log(error);
      });
  },
  setId({commit}) {
    fireApp.auth().onAuthStateChanged(user => {
      if(user) {
        commit('setId', user.uid);
        console.log('ユーザーIDセット', user.uid);
      } else {
        // this.$router.push('/auth');
      }
    });
  }
}

export const getters = {
  id(state) {
    return state.id;
  },
  signInBusy(state) {
    return state.signInBusy;
  }
}
