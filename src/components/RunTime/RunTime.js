import React from 'react'
import styles from './RunTime.css'
import DataCard from '../DataCard'
import ProSelect from '../ProSelect'
import { notification, Spin } from 'antd'
import R from 'ramda'
export default class RunTime extends React.Component {
  constructor () {
    super()
    this.state = {
      highData: {},
      lowData: {},
      mediaData: {},
      transBox: [],
      oneUnit: [],
      outerUnit: [],
      twoUnit: [],
      // units: [],
      bens: [],
      outDoorT: 0,
      loading: false
    }
    this.getProId = this.getProId.bind(this)
  }

  componentDidUpdate () {
    console.info(this.state)
  }
  getProId (id) {
    this.setState({ loading: true })
    fetch(`${__TASK_URL__}all_real?id=${id}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json.code === 0) {
        console.info(json)
        const isFilter = n => n !== null
        this.setState({
          highData: json.body.high || {},
          lowData: json.body.low || {},
          mediaData: json.body.median || {},
          transBox: R.filter(isFilter, json.body.t_f) || [],
          // units: [json.body.oneUnit, json.body.outerUnit, json.body.twoUnit] || [],
          oneUnit: R.filter(isFilter, json.body.oneUnit) || [],
          outerUnit: R.filter(isFilter, json.body.outerUnit) || [],
          twoUnit: R.filter(isFilter, json.body.twoUnit) || [],
          bens: R.filter(isFilter, json.body.w_b) || [],
          outDoorT: json.body.outDoorTemp || 0,
          loading: false
        })
      }
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
    const { highData, lowData, mediaData, transBox, oneUnit, outerUnit, twoUnit } = this.state
    const isEvent = n => !R.isEmpty(n)
    return (
      <div className={styles['runtime-container']}>
        <strong>数据中心</strong>
        <div><ProSelect getProId={this.getProId} /></div>
        <Spin tip='加载中...' spinning={this.state.loading}>
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
            {
              !R.isEmpty(transBox) &&
              <div className={styles['view']}>
                {
                  R.filter(isEvent, transBox).map((item, index) => {
                    return <div key={`trans${index}`} className={styles['item']}>
                      <DataCard title={`变压器${index + 1}`} data={[
                        { name: 'A相温度', value: item.a_tem },
                        { name: 'B相温度', value: item.b_tem },
                        { name: 'C相温度', value: item.c_tem },
                        { name: 'A相电流', value: item.a_ele },
                        { name: 'B相电流', value: item.b_ele },
                        { name: 'C相电流', value: item.c_ele },
                        { name: 'A相电压', value: item.a_pre },
                        { name: 'B相电压', value: item.b_pre },
                        { name: 'C相电压', value: item.c_pre },
                        { name: '有功功率', value: item.has_power },
                        { name: '无功功率', value: item.no_power },
                        { name: '频率', value: item.rate }
                      ]} />
                    </div>
                  })
                }
              </div>
            }
            {
              !R.isEmpty(oneUnit) &&
              <div className={styles['view']}>
                {
                  R.filter(isEvent, oneUnit).map((one, index) => {
                    return <div key={`ji${index + 1}`} className={styles['item']}>
                      <DataCard title={`${one.name}${index + 1}`} data={[
                        { name: '污水侧进水温度', value: one.dirtyWaterInTemp || 0 },
                        { name: '清水侧进水温度', value: one.cleanWaterInTemp || 0 },
                        { name: '污水侧出水温度', value: one.dirtyWaterOutTemp || 0 },
                        { name: '清水侧出水温度', value: one.cleanWaterOutTemp || 0 },
                        { name: '水箱温度', value: one.waterBoxTemp || 0 },
                        { name: '排气温度', value: one.gasOutTemp || 0 },
                        { name: '吸气温度', value: one.gasInTemp || 0 },
                        { name: '冷凝温度', value: one.condensingTemp || 0 },
                        { name: '蒸发温度', value: one.evapTemp || 0 },
                        { name: '运行电流', value: one.ele_flow || 0 },
                        { name: '运行容量', value: one.ele_total || 0 }
                      ]} />
                    </div>
                  })
                }
              </div>
            }
            {
              !R.isEmpty(outerUnit) &&
              <div className={styles['view']}>
                {
                  R.filter(isEvent, outerUnit).map((outer, index) => {
                    return <div key={`ji${index + 1}`} className={styles['item']}>
                      <DataCard title={`${outer.name}${index + 1}`} data={[
                        { name: '污水侧进水温度', value: outer.dirtyWaterInTemp || 0 },
                        { name: '清水侧进水温度', value: outer.cleanWaterInTemp || 0 },
                        { name: '污水侧出水温度', value: outer.dirtyWaterOutTemp || 0 },
                        { name: '清水侧出水温度', value: outer.cleanWaterOutTemp || 0 },
                        { name: '油箱温度', value: outer.oilBoxTemp || 0 },
                        { name: '冷凝压力', value: outer.condensingPress || 0 },
                        { name: '蒸发压力', value: outer.evapPress || 0 },
                        { name: '冷凝压力差', value: outer.condensingPressDiff || 0 },
                        { name: '电流载荷', value: outer.elecLoad || 0 },
                        { name: '蒸发全温', value: outer.evapFullTemp || 0 },
                        { name: '冷凝全温', value: outer.condensingFullTemp || 0 }
                      ]} />
                    </div>
                  })
                }
              </div>
            }
            {
              !R.isEmpty(twoUnit) &&
              <div className={styles['view']}>
                {
                  R.filter(isEvent, twoUnit).map((two, index) => {
                    return <div key={`ji${index + 1}`} className={styles['item']}>
                      <DataCard title={`${two.name}${index + 1}`} data={[
                        { name: '污水侧进水温度', value: two.dirtyWaterInTemp || 0 },
                        { name: '清水侧进水温度', value: two.cleanWaterInTemp || 0 },
                        { name: '污水侧出水温度', value: two.dirtyWaterOutTemp || 0 },
                        { name: '清水侧出水温度', value: two.cleanWaterOutTemp || 0 },
                        { name: '第一排气温度', value: two.firstGasOutTemp || 0 },
                        { name: '第一吸气温度', value: two.firstGasInTemp || 0 },
                        { name: '第一冷凝温度', value: two.firstCondensingTemp || 0 },
                        { name: '第一蒸发温度', value: two.firstEvapTemp || 0 },
                        { name: '第一运行电流', value: two.firstEleFlow || 0 },
                        { name: '第一运行容量', value: two.firstEleTotal || 0 },
                        { name: '第二排气温度', value: two.secondGasOutTemp || 0 },
                        { name: '第二吸气温度', value: two.secondGasInTemp || 0 },
                        { name: '第二冷凝温度', value: two.secondCondensingTemp || 0 },
                        { name: '第二蒸发温度', value: two.secondEvapTemp || 0 },
                        { name: '第二运行电流', value: two.secondEleFlow || 0 },
                        { name: '第二运行容量', value: two.secondEleTotal || 0 },
                        { name: '水箱温度', value: two.waterBoxTemp || 0 }
                      ]} />
                    </div>
                  })
                }
              </div>
            }
          </div>
        </Spin>
      </div>
    )
  }
}
