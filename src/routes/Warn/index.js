export default (store) => ({
  path: 'warning',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const WarningView = require('./components/WarningView').default
      cb(null, WarningView)
    }, 'warning')
  }
})
