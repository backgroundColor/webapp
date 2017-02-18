import React from 'react'
import styles from './MapBox.css'
import { Carousel } from 'antd'
import Plot from '../Plot'
import Map from './Map'
export default class MapBox extends React.Component {

  constructor () {
    super()
    this.state = {
      data: []
    }
    this.mapClick = this.mapClick.bind(this)
  }
  mapClick (value) {
    console.info(value)
    fetch(`${__TASK_URL__}projects/city?city=${value}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      console.log(json)
      this.setState({
        data: json.body[0]
      })
    })
  }
  render () {
    const { data = [] } = this.state
    const imgTemples = data.urls && data.urls.map((item, index) => {
      return <div key={`img${index}`} className={styles['img']}>
        <img height='200' style={{ width: '100%' }} src={item} />
      </div>
    })
    // console.info(imgTemples)
    return (
      <div className={styles['map-box']}>
        <div className={styles['message']}>
          <div className={styles['map']}>
            <Map onClick={this.mapClick} />
          </div>
          <div className={styles['project-mess']}>
            <h4>{data.name || '项目'}</h4>
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
                  <div className={styles['description']}>{data.desc}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles['line']}>
          <h3>数据图表</h3>
          <div className={styles['item']}>
            <Plot id='test1' unit='.C' />
          </div>
          <div className={styles['item']}>
            <Plot id='test2' unit='kw/h' />
          </div>
        </div>
      </div>
    )
  }
}
