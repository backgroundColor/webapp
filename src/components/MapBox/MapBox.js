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
    return (
      <div className={styles['map-box']}>
        <div className={styles['message']}>
          <div className={styles['map']}>
            <Map onClick={this.mapClick} />
          </div>
          <div className={styles['project-mess']}>
            <h4>testPro</h4>
            <div className={styles['img-box']}>
            {
              <Carousel autoplay>
                {
                  data.urls && data.urls.map((item, index) => {
                    return <div key={`img${index}`} className={styles['img']}>
                      <img height='200' src={item} />
                    </div>
                  })
                }
              </Carousel>
              }
            </div>
            <div className={styles['project']}>
              <ul>
                <li><span>省:</span><div>{data.province}</div></li>
                <li><span>市:</span><div>{data.city}</div></li>
                <li><span>项目:</span><div>{data.name}</div></li>
                <li><span>创建时间:</span><div>{data.createTime}</div></li>
                <li><span>描述:</span><div>{data.desc}</div></li>
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
