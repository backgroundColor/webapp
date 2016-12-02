import React from 'react'
import classes from './TaslTableView.css'
import AgTable from '../AgTable'
import moment from 'moment'
type Props = {
  path: string,
  type: string
}
export default class TaskTableView extends React.Component {
  props: Props
  componentDidMount () {
    console.log(this.props.path)
  }
  render () {
    const cols = (() => {
      switch (this.props.type) {
        case 'instances':
          return [{headerName: '项目ID', field: 'id', cellStyle: {padding: '8px'}},
            {headerName: '任务名称', field: 'taskId', cellStyle: {padding: '8px'}},
            {headerName: '开始时间', field: 'startTime', cellRenderer: function (params) {
              return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm:ss') : params.value
            }, cellStyle: {padding: '8px'}},
            {headerName: '结束时间', field: 'endTime', cellRenderer: function (params) {
              return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm:ss') : params.value
            }, cellStyle: {padding: '8px'}},
            {headerName: '运行结果', field: 'result', cellStyle: {padding: '8px'}},
            {headerName: '信息', field: 'message', cellStyle: {padding: '8px'}},
            {headerName: '首次运行时间', field: 'firstStartTime', cellRenderer: function (params) {
              return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm:ss') : params.value
            }, cellStyle: {padding: '8px'}},
            {headerName: '重启次数', field: 'restartCount', cellStyle: {padding: '8px'}},
            {headerName: '项目名称', field: 'instanceName', cellStyle: {padding: '8px'}}
          ]
        case 'tasks':
          return [{headerName: '任务ID', field: 'id', cellStyle: {padding: '8px'}},
            {headerName: '任务名称', field: 'taskName', cellStyle: {padding: '8px'}},
            {headerName: '触发规则', field: 'triggerRule', cellStyle: {padding: '8px'}},
            {headerName: '定时开始时间', field: 'quartzStartTime', cellRenderer: function (params) {
              return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm:ss') : params.value
            }, cellStyle: {padding: '8px'}},
            {headerName: '定时结束时间', field: 'quartzEndTime', cellRenderer: function (params) {
              return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm:ss') : params.value
            }, cellStyle: {padding: '8px'}},
            {headerName: '当前运行时间', field: 'latestExecTime', cellRenderer: function (params) {
              return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm:ss') : params.value
            }, cellStyle: {padding: '8px'}},
            {headerName: '时控', field: 'timed', cellStyle: {padding: '8px'}},
            {headerName: '源文件', field: 'taskClass', cellStyle: {padding: '8px'}},
            {headerName: '运行结果', field: 'result', cellStyle: {padding: '8px'}},
            {headerName: '运行状态', field: 'status', cellStyle: {padding: '8px'}},
            {headerName: '下次运行时间', field: 'nextExecTime', cellStyle: {padding: '8px'}},
            {headerName: '运行结果', field: 'message', cellStyle: {padding: '8px'}}
          ]
        default:
          return
      }
    })()
    return (
      <div className={classes['task-table-container']}>
        <AgTable path={this.props.path} cols={cols} type={this.props.type} />
      </div>
    )
  }
}
