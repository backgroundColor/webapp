import React from 'react'
import styles from './ProSelectTime.css'
import { Select, Row, Col, Button, notification, DatePicker } from 'antd'
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
      projectId: ''
    }
    this.handleProvince = this.handleProvince.bind(this)
    this.handleCities = this.handleCities.bind(this)
    this.handleProject = this.handleProject.bind(this)
    this.handleGetData = this.handleGetData.bind(this)
    this.timeRangeChange = this.timeRangeChange.bind(this)
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
      disabled: true
    })
    universalFetch(`${__TASK_URL__}projects/city?city=${value}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json) {
        this.setState({
          projects: json.body
        })
      }
    })
    .catch((err) => {
      console.error(err)
      this.showErr('error')
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
    this.setState({
      timeRange: dateString,
      disabled: false
    })
  }

  handleGetData () {
    this.props.getProId && this.props.getProId({
      id: this.state.projectId,
      start: this.state.timeRange[0],
      end: this.state.timeRange[1]
    })
  }
  render () {
    const { cityMess = [], cities = [],
      projects = [], province = '',
      city = '', project = '', disabled = true, projectId = '' } = this.state
    const cityOptions = cities.map(item => <Option key={item}>{item}</Option>)
    const projectOptions = projects.map(item => <Option key={item.name}>{item.name}</Option>)
    const dateFormat = 'YYYY/MM/DD'
    return (
      <div className={styles['proselect']}>
        <Row type='flex' justify='start'
          style={{ height: '100%', lineHeight: '45px' }}>
          <Col span={5}>
            <span>省:&nbsp;&nbsp;</span>
            <Select disabled={cityMess.length === 0}
              onChange={this.handleProvince}
              value={province} style={{ width: 130 }}>
              {
                cityMess.map((item) => {
                  return <Option key={`proTime${item.name}`}>{item.name}</Option>
                })
              }
            </Select>
          </Col>
          <Col span={5}>
            <span>市:&nbsp;&nbsp;</span>
            <span>
              <Select disabled={cities.length === 0}
                onChange={this.handleCities}
                value={city}
                style={{ width: 130 }}>
                {cityOptions}
              </Select>
            </span>
          </Col>
          <Col span={5}>
            <span>项目:&nbsp;&nbsp;</span>
            <input type='hidden' value={projectId} ref='' />
            <span>
              <Select disabled={projects.length === 0}
                onChange={this.handleProject}
                value={project}
                style={{ width: 130 }}>
                {projectOptions}
              </Select>
            </span>
          </Col>
          <Col span={6}>
            <RangePicker
              format={dateFormat}
              onChange={this.timeRangeChange}
            />
          </Col>
          <Col span={3}>
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
