import React from 'react'
import styles from './MapBox.css'
import { Carousel, Spin, notification } from 'antd'
// import Plot from '../Plot'
import Map from './Map'
import R from 'ramda'
import moment from 'moment'
import HomeGraph from './HomeGraph'
import { universalFetch } from 'modules/fetch'
type Props = {
  type: String,
  title: String,
  location: Object
}
export default class MapBox extends React.Component {
  props: Props
  constructor () {
    super()
    this.state = {
      data: [],
      loading: false,
      realTimeData: { '高溫': [], '中溫': [], '低溫': [] },
      electData: { '能耗': [] },
      axis: []
    }
    this.mapClick = this.mapClick.bind(this)
  }

  componentDidMount () {
    // console.info(this.props)
    this.mapClick(this.props.location.query['city'])
  }
  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps, this.props)) {
      this.mapClick(nextProps.location.query['city'])
    }
  }
  mapClick (value) {
    // console.info(value)
    this.setState({ loading: true })
    universalFetch(`${__TASK_URL__}projects/city?city=${value}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      // console.log(json)
      this.setState({
        data: json.body[0],
        loading: false
      })
      return json.body[0].id
    })
    .then((id) => {
      universalFetch(`${__TASK_URL__}alls?id=${id}`)
      .then((res) => res.status === 200 && res.json())
      .then((json) => {
        let realTimeData = { x: [], '高溫': [], '中溫': [], '低溫': [] }
        let electData = { x: [], '能耗': [] }
        // let axis = []
        R.values(json.body).forEach((item) => {
          realTimeData['x'].push(moment(item.createTime).format('HH:mm'))
          realTimeData['高溫'].push(item.highTemp)
          realTimeData['中溫'].push(item.medianTemp)
          realTimeData['低溫'].push(item.lowTemp)
          electData['能耗'].push(item.electricity)
          electData['x'].push(moment(item.createTime).format('HH:mm'))
          // axis.push(moment(item.createTime).format('HH:mm'))
        })
        this.setState({ realTimeData, electData })
      })
      .catch((err) => {
        notification['error']({
          message: '错误',
          description: err
        })
      })
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: err
      })
      this.setState({ loading: false })
    })
  }
  render () {
    const { data = [], realTimeData, electData, axis = [] } = this.state
    const imgTemples = data.urls && data.urls.length !== 0
    ? data.urls.map((item, index) => {
      return <div key={`img${index}`} className={styles['img']}>
        <img height='200' style={{ width: '100%' }} src={item} />
      </div>
    })
    : <div>暂无图片</div>
    // console.info(imgTemples)
    return (
      <div className={styles['map-box']}>
        <div className={styles['message']}>
          <div className={styles['map']}>
            <Map onClick={this.mapClick}
              city={this.props.location.query['city']} />
          </div>
          <div className={styles['project-mess']}>
            <Spin tip='加载中...' spinning={this.state.loading}>
              <h4><i className='fa fa-tasks' aria-hidden='true' />&nbsp;&nbsp;{data.name || '项目'}</h4>
              <div className={styles['img-box']}>
                {
                  data.length === 0
                    ? <div>暂无数据</div>
                  : <Carousel autoplay>
                    {imgTemples}
                  </Carousel>
                }
              </div>
              <div className={styles['project']}>
                <ul>
                  <li><span className={styles['name']}>省:</span><span>{data.province}</span></li>
                  <li><span className={styles['name']}>市:</span><span>{data.city}</span></li>
                  <li><span className={styles['name']}>项目:</span><span>{data.name}</span></li>
                  <li><span className={styles['name']}>创建时间:</span><span>{data.createTime}</span></li>
                  <li><span className={styles['name']}>描述:</span>
                    <div className={styles['description']} title={data.desc}>{data.desc}</div>
                  </li>
                </ul>
              </div>
            </Spin>
          </div>
        </div>
        <div className={styles['line']}>
          <h3><i className='fa fa-line-chart' aria-hidden='true' />&nbsp;&nbsp;数据图表</h3>
          <div className={styles['item']}>
            <h5><i className='fa fa-thermometer-empty' aria-hidden='true' />&nbsp;&nbsp;温度</h5>
            <Spin tip='加载中...' spinning={this.state.loading}>
              <HomeGraph height={250} data={realTimeData} axis={axis} />
            </Spin>
          </div>
          <div className={styles['item']}>
            <h5><i className='fa fa-battery-full' aria-hidden='true' />&nbsp;&nbsp;能耗</h5>
            <Spin tip='加载中...' spinning={this.state.loading}>
              <HomeGraph height={250} data={electData} axis={axis} />
            </Spin>
          </div>
        </div>
      </div>
    )
  }
}
