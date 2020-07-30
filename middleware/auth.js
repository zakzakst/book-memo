export default function ({ store, route, redirect }) {
  if (!store.state.auth.id && route.name !== 'auth') {
    return redirect('/auth');
  }
}
