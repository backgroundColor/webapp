import React from 'react'
import styles from './RunTime.css'
import DataCard from '../DataCard'
export default class RunTime extends React.Component {

  render () {
    const allData = [{
      name: '供水温度',
      value: 23
    },
    {
      name: '回水温度',
      value: 11.2
    },
    {
      name: '室内温度',
      value: 23
    },
    {
      name: '供水压力',
      value: 21
    },
    {
      name: '回水压力',
      value: 34
    },
    {
      name: '高区流量',
      value: 12
    }
    ]
    return (
      <div className={styles['runtime-container']}>
        <strong>数据中心</strong>
        <div className={styles['content']}>
          <div className={styles['view']}>
            <div className={styles['item-all']}>
              <DataCard title='高区实时数据' data={allData} />
            </div>
            <div className={styles['item-all']}>
              <DataCard title='中区实时数据' data={allData} />
            </div>
            <div className={styles['item-all']}>
              <DataCard title='低区实时数据' data={allData} />
            </div>
          </div>
          <div className={styles['view']}>
            <div className={styles['item']}>
              <DataCard title='变压器1' data={allData} />
            </div>
            <div className={styles['item']}>
              <DataCard title='变压器2' data={allData} />
            </div>
          </div>
          <div className={styles['view']}>
            <div className={styles['item']}>
              <DataCard title='单压(单机机组)' data={allData} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
