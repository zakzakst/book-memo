export default function ({ store, route, redirect }) {
  if (!store.state.auth.id && route.name !== 'auth') {
    // store.dispatch('auth/setId');
    return redirect('/auth');
  }
}
