import React from 'react'
import styles from './ProSelect.css'
import { Select, Row, Col, Button, notification } from 'antd'
const Option = Select.Option
type Props = {
  getData: Function
}
export default class ProSelect extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      provinces: [],
      cities: [],
      projects: [],
      province: '请选择',
      city: '请选择',
      project: '请选择',
      disabled: true,
      projectId: ''
    }
    this.getProvice = this.getProvice.bind(this)
    this.handleProvince = this.handleProvince.bind(this)
    this.handleCities = this.handleCities.bind(this)
    this.handleProject = this.handleProject.bind(this)
    this.handleGetData = this.handleGetData.bind(this)
  }
  componentDidMount () {
    this.getProvice()
  }
  componentDidUpdate () {
    // console.info(this.state)
  }
  showErr (type, message) {
    notification[type]({
      message: '错误',
      description: message
    })
  }
  getProvice () {
    fetch(`${__TASK_URL__}projects/provinces`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json) {
        this.setState({
          provinces: json
        })
      }
    })
    .catch((err) => {
      console.error(err)
      this.showErr('error', '获取省失败！！')
    })
  }
  handleProvince (value) {
    this.setState({
      province: value,
      city: '请选择',
      project: '请选择',
      disabled: true
    })
    fetch(`${__TASK_URL__}projects/cities?province=${value}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json) {
        this.setState({
          cities: json
        })
      }
    })
    .catch((err) => {
      console.error(err)
      this.showErr('error', '获取城市失败！！')
    })
  }
  handleCities (value) {
    console.info(value)
    this.setState({
      city: value,
      project: '请选择',
      disabled: true
    })
    fetch(`${__TASK_URL__}projects/city?city=${value}`)
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
      project: value,
      disabled: false
    })
  }
  handleGetData () {
    console.info('get data...')
    // console.info(this.state)
    fetch(`${__TASK_URL__}reports?page=1&size=10&id=${this.state.projectId}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json) {
        this.props.getData(json.body.items)
      }
    })
    .catch((err) => {
      console.error(err)
      this.showErr('error', '获取项目数据失败！！')
    })
  }
  render () {
    const { provinces = [], cities = [],
      projects = [], province = '',
      city = '', project = '', disabled = true, projectId = '' } = this.state
    const provinceOptions = provinces.map(item => <Option key={item}>{item}</Option>)
    const cityOptions = cities.map(item => <Option key={item}>{item}</Option>)
    const projectOptions = projects.map(item => <Option key={item.name}>{item.name}</Option>)
    return (
      <div className={styles['proselect']}>
        <Row type='flex' justify='start'
          style={{ height: '100%', lineHeight: '45px' }}>
          <Col span={7}>
            <span>省:&nbsp;&nbsp;</span>
            <Select disabled={provinces.length === 0}
              onChange={this.handleProvince}
              value={province} style={{ width: 200 }}>
              {provinceOptions}
            </Select>
          </Col>
          <Col span={7}>
            <span>市:&nbsp;&nbsp;</span>
            <span>
              <Select disabled={cities.length === 0}
                onChange={this.handleCities}
                value={city}
                style={{ width: 200 }}>
                {cityOptions}
              </Select>
            </span>
          </Col>
          <Col span={7}>
            <span>项目:&nbsp;&nbsp;</span>
            <input type='hidden' value={projectId} ref='' />
            <span>
              <Select disabled={projects.length === 0}
                onChange={this.handleProject}
                value={project}
                style={{ width: 200 }}>
                {projectOptions}
              </Select>
            </span>
          </Col>
          <Col span={3}>
            <Button onClick={this.handleGetData} type='primary' disabled={disabled}>查询</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
