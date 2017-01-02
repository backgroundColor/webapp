export default (store) => ({
  path: 'modifyuser',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ModifyUser = require('./components/ModifyUserView').default
      cb(null, ModifyUser)
    }, 'modifyuser')
  }
})
