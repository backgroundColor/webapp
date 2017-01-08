export default (store) => ({
  path: 'runtime',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const RunTimeView = require('./components/RunTimeView').default
      cb(null, RunTimeView)
    }, 'runtime')
  }
})
