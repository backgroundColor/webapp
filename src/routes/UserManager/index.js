export default (store) => ({
  path: '/user/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const UserManagerView = require('./components/UserManagerView').default

      cb(null, UserManagerView)
    }, 'usermanager')
  }
})
