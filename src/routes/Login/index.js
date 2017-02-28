export default (store: Store<*, *>) => ({
  path : 'login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: () => void) {
    require.ensure([], (require) => {
      const LoginView = require('./components/LoginView.js').default

      cb(null, LoginView)

    /* Webpack named bundle   */
  }, 'login')
  }
})
