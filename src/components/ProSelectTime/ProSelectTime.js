import React from 'react'
import styles from './ProSelectTime.css'
import { Select, Row, Col, Button, notification, DatePicker, Spin } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { connect } from 'react-redux'
import { universalFetch } from 'modules/fetch'
import R from 'ramda'
moment.locale('zh-cn')
const { RangePicker } = DatePicker
const Option = Select.Option
type Props = {
  getData: Function,
  getProId: Function,
  cityMess: Object
}
class ProSelectTime extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      cityMess: [],
      provinces: [],
      cities: [],
      projects: [],
      province: '请选择',
      city: '请选择',
      project: '请选择',
      disabled: true,
      projectId: '',
      loading: false,
      timeRange: [],
      timeType: 'minute',
      timeInterval: '',
      timeIntervalRange: [],
      timeDisable: {
        minute: false,
        hour: false,
        day: false
      }
    }
    this.handleProvince = this.handleProvince.bind(this)
    this.handleCities = this.handleCities.bind(this)
    this.handleProject = this.handleProject.bind(this)
    this.handleGetData = this.handleGetData.bind(this)
    this.timeRangeChange = this.timeRangeChange.bind(this)
    this.timeTypeChange = this.timeTypeChange.bind(this)
    this.timeSelect = this.timeSelect.bind(this)
  }

  componentDidMount () {
    this.setState({
      cityMess: this.props.cityMess
    })
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps, this.props)) {
      console.info('ProSelect:', nextProps)
      this.setState({
        cityMess: nextProps.cityMess
      })
    }
  }
  showErr (type, message) {
    notification[type]({
      message: '错误',
      description: message
    })
  }

  handleProvince (value) {
    const isFilter = n => n.name === value
    const { cityMess } = this.state
    this.setState({
      province: value,
      city: '请选择',
      project: '请选择',
      disabled: true,
      timeRange: [],
      cities: R.filter(isFilter, cityMess)[0].list
    })
  }
  handleCities (value) {
    console.info(value)
    this.setState({
      city: value,
      project: '请选择',
      disabled: true,
      loading: true
    })
    universalFetch(`${__TASK_URL__}projects/city?city=${value}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json) {
        this.setState({
          projects: json.body,
          loading: false
        })
      }
    })
    .catch((err) => {
      console.error(err)
      this.showErr('error')
      this.setState({ loading: false })
    })
  }
  handleProject (value) {
    this.state.projects.forEach((item) => {
      // console.info(item)
      if (item.name === value) {
        this.setState({
          projectId: item.id
        })
      }
    })
    this.setState({
      project: value
    })
  }

  timeRangeChange (date, dateString) {
    const diffDay = moment(dateString[1]).diff(moment(dateString[0]), 'days')
    const diffHour = moment(dateString[1]).diff(moment(dateString[0]), 'hours')
    const diffMinute = moment(dateString[1]).diff(moment(dateString[0]), 'minutes')
    console.info(diffDay, diffHour, diffMinute)
    this.setState({
      timeRange: dateString,
      disabled: false,
      timeInterval: 5,
      timeIntervalRange: (() => {
        let arr = []
        let len = diffMinute / 60 > 1 ? 60 : 1
        for (let i = 1; i < len; i++) {
          arr.push(i * 5)
        }
        return arr
      })(),
      timeDisable: {
        minute: false,
        hour: diffHour < 1,
        day: diffDay < 1
      },
      timeType: 'minute'
    })
  }

  handleGetData () {
    // console.info({
    //   id: this.state.projectId,
    //   start: this.state.timeRange[0],
    //   end: this.state.timeRange[1],
    //   internal: `${this.state.timeInterval}${this.state.timeType}`
    // })
    this.props.getProId && this.props.getProId({
      id: this.state.projectId,
      start: this.state.timeRange[0],
      end: this.state.timeRange[1],
      interval: this.state.timeInterval,
      timeType: this.state.timeType
    })
  }

  timeSelect (value) {
    this.setState({
      timeInterval: value
    })
  }

  timeTypeChange (value) {
    const { timeRange } = this.state
    const diffDay = moment(timeRange[1]).diff(moment(timeRange[0]), 'days')
    const diffHour = moment(timeRange[1]).diff(moment(timeRange[0]), 'hours')
    const diffMinute = moment(timeRange[1]).diff(moment(timeRange[0]), 'minutes')
    console.info(diffDay, diffHour, diffMinute)
    switch (value) {
      case 'hour':
        this.setState({
          timeIntervalRange: (() => {
            let arr = []
            let len = diffHour / 24 > 1 ? 24 : diffHour
            for (let i = 1; i < len; i++) {
              arr.push(parseInt(i))
            }
            return arr
          })(),
          timeInterval: 1,
          timeType: value
        })
        break
      case 'minute':
        this.setState({
          timeIntervalRange:  (() => {
            let arr = []
            let len = diffMinute / 60 > 1 ? 13 : 1
            for (let i = 1; i < len; i++) {
              arr.push(parseInt(i * 5))
            }
            return arr
          })(),
          timeInterval: 5,
          timeType: value
        })
        break
      case 'day':
        this.setState({
          timeIntervalRange:  (() => {
            let arr = []
            // let len = diffDay / 24 > 1 ? 24 : diffHour
            for (let i = 1; i < diffDay; i++) {
              arr.push(parseInt(i))
            }
            return arr
          })(),
          timeInterval: 1,
          timeType: value
        })
        break
      default:
        this.setState({
          timeIntervalRange: []
        })
        return
    }
  }
  render () {
    const { cityMess = [], cities = [],
      projects = [], province = '',
      city = '', project = '', disabled = true, projectId = '' } = this.state
    const cityOptions = cities.map(item => <Option key={item}>{item}</Option>)
    const projectOptions = projects.map(item => <Option key={item.name}>{item.name}</Option>)
    const dateFormat = 'YYYY-MM-DD'
    return (
      <div className={styles['proselect']}>
        <Row type='flex' justify='start'
          style={{ height: '100%', lineHeight: '45px' }}>
          <Col span={8}>
            <span>省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份:&nbsp;&nbsp;</span>
            <Select disabled={cityMess.length === 0}
              onChange={this.handleProvince}
              value={province} style={{ width: 220 }}>
              {
                cityMess.map((item) => {
                  return <Option key={item.name}>{item.name}</Option>
                })
              }
            </Select>
          </Col>
          <Col span={8}>
            <span>城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市:&nbsp;&nbsp;</span>
            <span>
              <Select disabled={cities.length === 0}
                onChange={this.handleCities}
                value={city}
                style={{ width: 220 }}>
                {cityOptions}
              </Select>
            </span>
          </Col>
          <Col span={8}>
            <Spin size='small' spinning={this.state.loading}>
              <span>项&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目:&nbsp;&nbsp;</span>
              <input type='hidden' value={projectId} ref='' />
              <span>
                <Select disabled={projects.length === 0}
                  onChange={this.handleProject}
                  value={project}
                  style={{ width: 220 }}>
                  {projectOptions}
                </Select>
              </span>
            </Spin>
          </Col>
        </Row>
        <Row type='flex' justify='start'
          style={{ height: '100%', lineHeight: '45px' }}>
          <Col span={8}>
            <span>时间范围:&nbsp;&nbsp;</span>
            <span>
              <RangePicker
                format={dateFormat}
                style={{ width: 220 }}
                onChange={this.timeRangeChange}
                />
            </span>
          </Col>
          <Col span={8}>
            <span >时间间隔:&nbsp;&nbsp;</span>
            <span>
              <Select value={this.state.timeInterval}
                onChange={this.timeSelect}
                notFoundContent='时间范围固定'
                disabled={disabled}
                style={{ width: 100 }}>
                {
                  this.state.timeIntervalRange.map((t, index) => {
                    return <Option value={`${t}`} key={`t${index}`}>{t}</Option>
                  })
                }
              </Select>
              <Select value={this.state.timeType}
                onChange={this.timeTypeChange}
                disabled={disabled}
                style={{ width: 120 }}>
                <Option value='minute' disabled={this.state.timeDisable['minute']}>分钟</Option>
                <Option value='hour' disabled={this.state.timeDisable['hour']}>小时</Option>
                <Option value='day' disabled={this.state.timeDisable['day']}>天</Option>
              </Select>
            </span>
          </Col>
          <Col span={8}>
            <Button onClick={this.handleGetData} type='primary' disabled={disabled}>查询</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cityMess: state.cityMess.citymess
})

export default connect(mapStateToProps, {})(ProSelectTime)
