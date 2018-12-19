export default function ({ store, redirect, route }) {
  if (store.state.login.userdata.uName == 'admin' || route.path == '/admin') {
    return 
  }else{
    return redirect('/')
  }
}
