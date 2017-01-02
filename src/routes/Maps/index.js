export default (store) => ({
  path: '/maps',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Maps = require('./components/MapsView').default
      cb(null, Maps)
    }, 'maps')
  }
})
