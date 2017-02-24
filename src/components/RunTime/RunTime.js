import React from 'react'
import styles from './RunTime.css'
import DataCard from '../DataCard'
import ProSelect from '../ProSelect'
import { notification } from 'antd'
import R from 'ramda'
export default class RunTime extends React.Component {
  constructor () {
    super()
    this.state = {
      highData: {},
      lowData: {},
      mediaData: {},
      transBox: [],
      units: [],
      bens: [],
      outDoorT: 0
    }
    this.getProId = this.getProId.bind(this)
  }

  componentDidUpdate () {
    console.info(this.state)
  }
  getProId (id) {
    fetch(`${__TASK_URL__}all_real?id=${id}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json.code === 0) {
        console.info(json)
        this.setState({
          highData: json.body.high || {},
          lowData: json.body.low || {},
          mediaData: json.body.median || {},
          transBox: json.body.t_f || [],
          units: [json.body.oneUnit, json.body.outerUnit, json.body.twoUnit] || [],
          bens: json.body.w_b || [],
          outDoorT: json.body.outDoorTemp || 0
        })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: err
      })
    })
  }

  render () {
    const { highData, lowData, mediaData, transBox, units } = this.state
    const isEvent = n => !R.isEmpty(n)
    return (
      <div className={styles['runtime-container']}>
        <strong>数据中心</strong>
        <div><ProSelect getProId={this.getProId} /></div>
        <div className={styles['content']}>
          <div className={styles['view']}>
            <div className={styles['item-all']}>
              <DataCard title='高区实时数据' data={[
                  { name: '供水温度', value: highData.supply_water_temp || 0 },
                  { name: '回水温度', value: highData.back_water_temp || 0 },
                  { name: '室内温度', value: highData.house_temp || 0 },
                  { name: '供水压力', value: highData.supply_water_press || 0 },
                  { name: '回水压力', value: highData.back_water_press || 0 },
                  { name: '高区流量', value: highData.water_flow || 0 }
              ]} />
            </div>
            <div className={styles['item-all']}>
              <DataCard title='中区实时数据' data={[
                { name: '供水温度', value: mediaData.supply_water_temp || 0 },
                { name: '回水温度', value: mediaData.back_water_temp || 0 },
                { name: '室内温度', value: mediaData.house_temp || 0 },
                { name: '供水压力', value: mediaData.supply_water_press || 0 },
                { name: '回水压力', value: mediaData.back_water_press || 0 },
                { name: '高区流量', value: mediaData.water_flow || 0 }
              ]} />
            </div>
            <div className={styles['item-all']}>
              <DataCard title='低区实时数据' data={[
                { name: '供水温度', value: lowData.supply_water_temp || 0 },
                { name: '回水温度', value: lowData.back_water_temp || 0 },
                { name: '室内温度', value: lowData.house_temp || 0 },
                { name: '供水压力', value: lowData.supply_water_press || 0 },
                { name: '回水压力', value: lowData.back_water_press || 0 },
                { name: '高区流量', value: lowData.water_flow || 0 }
              ]} />
            </div>
          </div>
          <div className={styles['view']}>
            {
              transBox.map((item, index) => {
                return <div key={`trans${index}`} className={styles['item']}>
                  <DataCard title={`${item.name}${index}`} data={[
                    { name: 'A相温度', value: item.a_tem || 0 },
                    { name: 'B相温度', value: item.b_tem || 0 },
                    { name: 'C相温度', value: item.c_tem || 0 },
                    { name: 'A相电流', value: item.a_ele || 0 },
                    { name: 'B相电流', value: item.b_ele || 0 },
                    { name: 'C相电流', value: item.c_ele || 0 },
                    { name: 'A相电压', value: item.a_pre || 0 },
                    { name: 'B相电压', value: item.b_pre || 0 },
                    { name: 'C相电压', value: item.c_pre || 0 },
                    { name: '有功功率', value: item.has_power || 0 },
                    { name: '无功功率', value: item.no_power || 0 },
                    { name: '频率', value: item.rate || 0 }
                  ]} />
                </div>
              })
            }
          </div>
          {
            R.filter(isEvent, units).map((unit, index) => {
              return <div className={styles['view']} key={`unit${index}`}>
                {
                  unit.length !== 0 && unit.map((item, i) => {
                    return <div key={`ji${i}`} className={styles['item']}>
                      <DataCard title={`${item.name}${i}`} data={[
                        { name: '污水侧进水温度', value: item.dirtyWaterInTemp || 0 },
                        { name: '清水侧进水温度', value: item.cleanWaterInTemp || 0 },
                        { name: '污水侧出水温度', value: item.dirtyWaterOutTemp || 0 },
                        { name: '清水侧出水温度', value: item.cleanWaterOutTemp || 0 },
                        { name: '水箱温度', value: item.waterBoxTemp || 0 },
                        { name: '排气温度', value: item.gasOutTemp || 0 },
                        { name: '吸气温度', value: item.gasInTemp || 0 },
                        { name: '冷凝温度', value: item.condensingTemp || 0 },
                        { name: '蒸发温度', value: item.evapTemp || 0 },
                        { name: '运行电流', value: item.ele_flow || 0 },
                        { name: '运行容量', value: item.ele_total || 0 }
                      ]} />
                    </div>
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
