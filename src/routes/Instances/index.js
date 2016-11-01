export default (store) => ({
  path: 'instances',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Instances = require('./components/InstancesView').default
      cb(null, Instances)
    }, 'instances')
  }
})
