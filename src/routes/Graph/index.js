export default (store) => ({
  path: 'graph',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const RunTimeView = require('./components/GraphView').default
      cb(null, RunTimeView)
    }, 'graph')
  }
})
