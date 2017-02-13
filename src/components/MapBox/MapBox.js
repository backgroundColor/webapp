import React from 'react'
import styles from './MapBox.css'
import { Carousel } from 'antd'
import Plot from '../Plot'
import Map from './Map'
export default class MapBox extends React.Component {

  render () {
    return (
      <div className={styles['map-box']}>
        <div className={styles['message']}>
          <div className={styles['map']}>
            <Map />
          </div>
          <div className={styles['project-mess']}>
            <h4>testPro</h4>
            <div className={styles['img-box']}>
              <Carousel autoplay>
                <div className={styles['img']}>
                  <img height='200' src='http://img2.zol.com.cn/product/103_940x705/867/cesKh6vHhpmjE.jpg' />
                </div>
                <div className={styles['img']}>
                  <img height='200' src='http://img2.zol.com.cn/product/103_940x705/867/cesKh6vHhpmjE.jpg' />
                </div>
                <div className={styles['img']}>
                  <img height='200' src='http://img2.zol.com.cn/product/103_940x705/867/cesKh6vHhpmjE.jpg' />
                </div>
                <div className={styles['img']}>
                  <img height='200' src='http://img2.zol.com.cn/product/103_940x705/867/cesKh6vHhpmjE.jpg' />
                </div>
              </Carousel>
            </div>
            <div className={styles['project']}>
              <ul>
                <li><span>省:</span><div>sss</div></li>
                <li><span>市:</span><div>sss</div></li>
                <li><span>项目:</span><div>sss</div></li>
                <li><span>创建时间:</span><div>sss</div></li>
                <li><span>描述:</span><div>ssssssssssssssss</div></li>
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
