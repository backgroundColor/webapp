export default (store) => ({
  path: 'tasks',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const TasksView = require('./containers/TasksContainer').default
      cb(null, TasksView)
    }, 'tasks')
  }
})
