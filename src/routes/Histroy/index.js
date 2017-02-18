export default (store) => ({
  path: 'history',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const RunTimeView = require('./components/HistoryView').default
      cb(null, RunTimeView)
    }, 'history')
  }
})
