export default (store: Store<*, *>) => ({
  path : 'adduser',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: () => void) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AddUser = require('./components/AddUserView').default

      cb(null, AddUser)

    /* Webpack named bundle   */
    }, 'adduser')
  }
})
