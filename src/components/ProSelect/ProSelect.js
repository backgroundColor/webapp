import React from 'react'
import styles from './ProSelect.css'
import { Select, Row, Col, Button, notification, Spin } from 'antd'
import { connect } from 'react-redux'
import { universalFetch } from 'modules/fetch'
import R from 'ramda'
const Option = Select.Option
type Props = {
  getData: Function,
  getProId: Function,
  cityMess: Object
}
class ProSelect extends React.Component {
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
      loading: false
    }
    this.handleProvince = this.handleProvince.bind(this)
    this.handleCities = this.handleCities.bind(this)
    this.handleProject = this.handleProject.bind(this)
    this.handleGetData = this.handleGetData.bind(this)
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
        console.info('city', json)
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
    this.props.getProId && this.props.getProId(this.state.projectId)
    if (!this.props.getData) return
    universalFetch(`${__TASK_URL__}reports?page=1&size=10&id=${this.state.projectId}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json) {
        this.props.getData && this.props.getData(json.body.items)
      }
    })
    .catch((err) => {
      console.error(err)
      this.showErr('error', '获取项目数据失败！！')
    })
  }
  render () {
    const { cityMess = [], cities = [],
      projects = [], province = '',
      city = '', project = '', disabled = true, projectId = '' } = this.state
    const cityOptions = cities.map(item => <Option key={item}>{item}</Option>)
    const projectOptions = projects.map((item) => <Option key={item.name}>{item.name}</Option>)
    return (
      <div className={styles['proselect']}>
        <Row type='flex' justify='start'
          style={{ height: '100%', lineHeight: '45px' }}>
          <Col span={7}>
            <span>省:&nbsp;&nbsp;</span>
            <Select disabled={cityMess.length === 0}
              onChange={this.handleProvince}
              value={province} style={{ width: 150 }}>
              {
                cityMess.map((item) => {
                  return <Option key={item.name}>{item.name}</Option>
                })
              }
            </Select>
          </Col>
          <Col span={7}>
            <span>市:&nbsp;&nbsp;</span>
            <span>
              <Select disabled={cities.length === 0}
                onChange={this.handleCities}
                value={city}
                style={{ width: 150 }}>
                {cityOptions}
              </Select>
            </span>
          </Col>
          <Col span={7}>
            <Spin size='small' spinning={this.state.loading}>
              <span>项目:&nbsp;&nbsp;</span>
              <input type='hidden' value={projectId} ref='' />
              <span>
                <Select disabled={projects.length === 0}
                  onChange={this.handleProject}
                  value={project}
                  style={{ width: 150 }}>
                  {projectOptions}
                </Select>
              </span>
            </Spin>
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
export default connect(mapStateToProps, {})(ProSelect)
