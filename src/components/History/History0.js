import React from 'react'
import styles from './Histroy.css'
import ProSelectTime from '../ProSelectTime'
import TableView from '../TableView'
import { notification, Pagination, Spin } from 'antd'
import LineGraph from '../LineGraph'
import R from 'ramda'
import { universalFetch } from 'modules/fetch'
export default class History extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
      total: 1,
      val: {},
      loading: false
    }
    this.getProId = this.getProId.bind(this)
    this.getData = this.getData.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.toggleBtn = this.toggleBtn.bind(this)
  }
  componentDidUpdate () {
    // console.info('state', this.state.data)
  }
  pageChange (val) {
    // console.log(this.state.val)
    this.getData(this.state.val, val)
  }
  getProId (val) {
    console.info(val)
    this.setState({ val })
    this.getData(val, 1)
  }
  toggleBtn (value) {
    console.log(this.refs[value].style.display)
    this.refs[value].style.display = this.refs[value].style.display === 'none'
    ? 'block' : 'none'
  }
  getData (val, page) {
    // FIX ME 后台需要加时间过滤, 加时间过滤后开启以下代码
    // fetch(`${__TASK_URL__}history?id=${val.id}&page=${page}&size=10&start=${val.start}&end=${val.end}`)
    this.setState({ loading: true })
    universalFetch(`${__TASK_URL__}history?id=${val.id}&page=${page}&size=10`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      const isFilter = n => n !== null
      // console.info('high', R.filter(isFilter, json.body.items.map((d) => d.high)))
      this.setState({
        data: {
          high: R.filter(isFilter, json.body.items.map((d) => d.high)) || [],
          media: R.filter(isFilter, json.body.items.map((d) => d.median)) || [],
          low: R.filter(isFilter, json.body.items.map((d) => d.low)) || [],
          transBox: R.filter(isFilter, json.body.items.map((d) => d.t_f)) || [],
          oneUnit: R.filter(isFilter, json.body.items.map((d) => d.oneUnit)) || [],
          outerUnit: R.filter(isFilter, json.body.items.map((d) => d.outerUnit)) || [],
          twoUnit: R.filter(isFilter, json.body.items.map((d) => d.twoUnit)) || []
        },
        total: json.body.info.total,
        loading: false
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
    const columns = {
      high: [{ title: '供水温度', dataIndex: 'supply_water_temp', key: 1, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 2, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 3, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 4, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 5, render: (text) => <span>{text}Pa</span> },
        { title: '高区流量', dataIndex: 'water_flow', key: 6, render: (text) => <span>{text}cc</span> }
      ],
      media: [{ title: '供水温度', dataIndex: 'supply_water_temp', key: 7, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 8, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 9, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 10, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 11, render: (text) => <span>{text}Pa</span> },
        { title: '中区区流量', dataIndex: 'water_flow', key: 12, render: (text) => <span>{text}cc</span> }
      ],
      low: [{ title: '供水温度', dataIndex: 'supply_water_temp', key: 13, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 14, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 15, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 16, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 17, render: (text) => <span>{text}Pa</span> },
        { title: '低区流量', dataIndex: 'water_flow', key: 18, render: (text) => <span>{text}cc</span> }
      ],
      transBox: [{ title: 'A相温度', dataIndex: 'a_tem', key: 19, render: (text) => <span>{text}°C</span> },
        { title: 'B相温度', dataIndex: 'b_tem', key: 20, render: (text) => <span>{text}°C</span> },
        { title: 'C相温度', dataIndex: 'c_tem', key: 21, render: (text) => <span>{text}°C</span> },
        { title: 'A相电流', dataIndex: 'a_ele', key: 22, render: (text) => <span>{text}A</span> },
        { title: 'B相电流', dataIndex: 'b_ele', key: 23, render: (text) => <span>{text}A</span> },
        { title: 'C相电流', dataIndex: 'c_ele', key: 24, render: (text) => <span>{text}A</span> },
        { title: 'A相电压', dataIndex: 'a_pre', key: 25, render: (text) => <span>{text}V</span> },
        { title: 'B相电压', dataIndex: 'b_pre', key: 26, render: (text) => <span>{text}V</span> },
        { title: 'C相电压', dataIndex: 'c_pre', key: 27, render: (text) => <span>{text}V</span> },
        { title: '有功功率', dataIndex: 'has_power', key: 28, render: (text) => <span>{text}W</span> },
        { title: '无功功率', dataIndex: 'no_power', key: 29, render: (text) => <span>{text}W</span> },
        { title: '频率', dataIndex: 'rate', key: 30, render: (text) => <span>{text}Hz</span> }
      ],
      unit: [{ title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key: 31, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 32, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 33, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 34, render: (text) => <span>{text}°C</span> },
        { title: '水箱温度', dataIndex: 'waterBoxTemp', key: 35, render: (text) => <span>{text}°C</span> },
        { title: '排气温度', dataIndex: 'gasOutTemp', key: 36, render: (text) => <span>{text}°C</span> },
        { title: '吸气温度', dataIndex: 'gasInTemp', key: 37, render: (text) => <span>{text}°C</span> },
        { title: '冷凝温度', dataIndex: 'condensingTemp', key: 38, render: (text) => <span>{text}°C</span> },
        { title: '蒸发温度', dataIndex: 'evapTemp', key: 39, render: (text) => <span>{text}°C</span> },
        { title: '运行电流', dataIndex: 'ele_flow', key: 40, render: (text) => <span>{text}A</span> },
        { title: '运行容量', dataIndex: 'ele_total', key: 41, render: (text) => <span>{text}F</span> }
      ],
      twoUnit: [{ title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key:42, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 43, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 44, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 45, render: (text) => <span>{text}°C</span> },
        { title: '第一排气温度', dataIndex: 'firstGasOutTemp', key: 46, render: (text) => <span>{text}°C</span> },
        { title: '第一吸气温度', dataIndex: 'firstGasInTemp', key: 47, render: (text) => <span>{text}°C</span> },
        { title: '第一冷凝温度', dataIndex: 'firstCondensingTemp', key: 48, render: (text) => <span>{text}°C</span> },
        { title: '第一蒸发温度', dataIndex: 'firstEvapTemp', key: 49, render: (text) => <span>{text}°C</span> },
        { title: '第一运行电流', dataIndex: 'firstEleFlow', key: 50, render: (text) => <span>{text}A</span> },
        { title: '第一运行容量', dataIndex: 'firstEleTotal', key: 51, render: (text) => <span>{text}F</span> },
        { title: '第二排气温度', dataIndex: 'secondGasOutTemp', key: 52, render: (text) => <span>{text}°C</span> },
        { title: '第二吸气温度', dataIndex: 'secondGasInTemp', key: 53, render: (text) => <span>{text}°C</span> },
        { title: '第二冷凝温度', dataIndex: 'secondCondensingTemp', key: 54, render: (text) => <span>{text}°C</span> },
        { title: '第二蒸发温度', dataIndex: 'secondEvapTemp', key: 55, render: (text) => <span>{text}°C</span> },
        { title: '第二运行电流', dataIndex: 'secondEleFlow', key: 56, render: (text) => <span>{text}A</span> },
        { title: '第二运行容量', dataIndex: 'secondEleTotal', key: 57, render: (text) => <span>{text}F</span> },
        { title: '水箱温度', dataIndex: 'waterBoxTemp', key: 58, render: (text) => <span>{text}°C</span> }
      ],
      outerUnit: [{ title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key:59, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 60, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 61, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 62, render: (text) => <span>{text}°C</span> },
        { title: '油箱温度', dataIndex: 'oilBoxTemp', key: 63, render: (text) => <span>{text}°C</span> },
        { title: '冷凝压力', dataIndex: 'condensingPress', key: 64, render: (text) => <span>{text}°C</span> },
        { title: '蒸发压力', dataIndex: 'evapPress', key: 65, render: (text) => <span>{text}°C</span> },
        { title: '冷凝压力差', dataIndex: 'condensingPressDiff', key: 66, render: (text) => <span>{text}°C</span> },
        { title: '电流载荷', dataIndex: 'elecLoad', key: 67, render: (text) => <span>{text}A</span> },
        { title: '蒸发全温', dataIndex: 'evapFullTemp', key: 68, render: (text) => <span>{text}F</span> },
        { title: '冷凝全温', dataIndex: 'condensingFullTemp', key: 69, render: (text) => <span>{text}°C</span> }
      ]

    }
    const that = this
    return (
      <div className={styles['container']}>
        <strong>数据中心</strong>
        <div><ProSelectTime getProId={this.getProId} /></div>
        <Spin tip='加载中...' spinning={this.state.loading}>
          <div className={styles['content']}>
            <div className={styles['view']}>
              <div className={styles['controll']}>
                <Pagination defaultCurrent={1} total={this.state.total} onChange={this.pageChange} />
              </div>
              <div className={styles['item']}>
                <h4 className={styles['title']}>
                  高区
                  <a title='面板开关' onClick={function () { that.toggleBtn('high') }}>
                    <span style={{ transform: 'rotate(0deg)' }}>
                      <i className='fa fa-thumb-tack' aria-hidden='true' />
                    </span>
                  </a>
                </h4>
                <div ref='high'>
                  <TableView pagination={false} columns={columns.high} data={this.state.data.high} />
                  <div className={styles['graph']}>
                    <LineGraph data={{
                      '供水温度': this.state.data.high && this.state.data.high.map((item) => item.supply_water_temp) || [0],
                      '回水温度': this.state.data.high && this.state.data.high.map((item) => item.back_water_temp) || [0],
                      '室内温度': this.state.data.high && this.state.data.high.map((item) => item.house_temp) || [0],
                      '供水压力': this.state.data.high && this.state.data.high.map((item) => item.supply_water_press) || [0],
                      '回水压力': this.state.data.high && this.state.data.high.map((item) => item.back_water_press) || [0],
                      '高区流量': this.state.data.high && this.state.data.high.map((item) => item.water_flow) || [0]
                    }} height={150} />
                  </div>
                </div>
              </div>
              <div className={styles['item']}>
                <h4 className={styles['title']}>
                  中区
                  <a title='面板开关' onClick={function () { that.toggleBtn('media') }}>
                    <span style={{ transform: 'rotate(0deg)' }}>
                      <i className='fa fa-thumb-tack' aria-hidden='true' />
                    </span>
                  </a>
                </h4>
                <div ref='media'>
                  <TableView pagination={false} columns={columns.media} data={this.state.data.media} />
                  <div className={styles['graph']}>
                    <LineGraph data={{
                      '供水温度': this.state.data.media && this.state.data.media.map((item) => item.supply_water_temp) || [0],
                      '回水温度': this.state.data.media && this.state.data.media.map((item) => item.back_water_temp) || [0],
                      '室内温度': this.state.data.media && this.state.data.media.map((item) => item.house_temp) || [0],
                      '供水压力': this.state.data.media && this.state.data.media.map((item) => item.supply_water_press) || [0],
                      '回水压力': this.state.data.media && this.state.data.media.map((item) => item.back_water_press) || [0],
                      '中区流量': this.state.data.media && this.state.data.media.map((item) => item.water_flow) || [0]
                    }} height={150} />
                  </div>
                </div>
              </div>
              <div className={styles['item']}>
                <h4 className={styles['title']}>
                  低区
                  <a title='面板开关' onClick={function () { that.toggleBtn('low') }}>
                    <span style={{ transform: 'rotate(0deg)' }}>
                      <i className='fa fa-thumb-tack' aria-hidden='true' />
                    </span>
                  </a>
                </h4>
                <div ref='low'>
                  <TableView pagination={false} columns={columns.low} data={this.state.data.low} />
                  <div className={styles['graph']}>
                    <LineGraph data={{
                      '供水温度': this.state.data.low && this.state.data.low.map((item) => item.supply_water_temp) || [0],
                      '回水温度': this.state.data.low && this.state.data.low.map((item) => item.back_water_temp) || [0],
                      '室内温度': this.state.data.low && this.state.data.low.map((item) => item.house_temp) || [0],
                      '供水压力': this.state.data.low && this.state.data.low.map((item) => item.supply_water_press) || [0],
                      '回水压力': this.state.data.low && this.state.data.low.map((item) => item.back_water_press) || [0],
                      '低区流量': this.state.data.low && this.state.data.low.map((item) => item.water_flow) || [0]
                    }} height={150} />
                  </div>
                </div>
              </div>
              {
                this.state.data.transBox &&
                this.state.data.transBox.length !== 0 && this.state.data.transBox.map((item, index) => {
                  return <div key={`transbox${index}`} className={styles['item']}>
                    <h4 className={styles['title']}>
                      变压器{index + 1}
                      <a title='面板开关' onClick={function () { that.toggleBtn(`transBox${index}`) }}>
                        <span style={{ transform: 'rotate(0deg)' }}>
                          <i className='fa fa-thumb-tack' aria-hidden='true' />
                        </span>
                      </a>
                    </h4>
                    <div ref={`transBox${index}`}>
                      <TableView pagination={false}
                        data={item}
                        columns={columns.transBox} />
                      <div className={styles['graph']}>
                        <LineGraph data={{
                          'A相温度': item && item.map((d) => d.a_tem) || [0],
                          'B相温度': item && item.map((d) => d.b_tem) || [0],
                          'C相温度': item && item.map((d) => d.c_tem) || [0],
                          'A相电流': item && item.map((d) => d.a_ele) || [0],
                          'B相电流': item && item.map((d) => d.b_ele) || [0],
                          'C相电流': item && item.map((d) => d.c_ele) || [0],
                          'A相电压': item && item.map((d) => d.a_pre) || [0],
                          'B相电压': item && item.map((d) => d.b_pre) || [0],
                          'C相电压': item && item.map((d) => d.c_pre) || [0],
                          '有功功率': item && item.map((d) => d.no_power) || [0],
                          '无功功率': item && item.map((d) => d.has_power) || [0],
                          '频率': item && item.map((d) => d.rate) || [0]
                        }} height={150} />
                      </div>
                    </div>
                  </div>
                })
              }
              {
                this.state.data.oneUnit &&
                this.state.data.oneUnit.length !== 0 && this.state.data.oneUnit.map((one, index) => {
                  return <div key={`oneUnit${index}`} className={styles['item']}>
                    <h4 className={styles['title']}>
                      机组数据(单-{index})
                      <a title='面板开关' onClick={function () { that.toggleBtn(`oneUnit${index}`) }}>
                        <span style={{ transform: 'rotate(0deg)' }}>
                          <i className='fa fa-thumb-tack' aria-hidden='true' />
                        </span>
                      </a>
                    </h4>
                    <div ref={`oneUnit${index}`}>
                      <TableView pagination={false} columns={columns.unit} data={one} />
                      <div className={styles['graph']}>
                        <LineGraph data={{
                          '污水侧进水温度': one && one.map((d) => d.dirtyWaterInTemp) || [0],
                          '清水侧进水温度': one && one.map((d) => d.cleanWaterInTemp) || [0],
                          '污水侧出水温度': one && one.map((d) => d.dirtyWaterOutTemp) || [0],
                          '清水侧出水温度': one && one.map((d) => d.cleanWaterOutTemp) || [0],
                          '水箱温度': one && one.map((d) => d.waterBoxTemp) || [0],
                          '排气温度': one && one.map((d) => d.gasOutTemp) || [0],
                          '吸气温度': one && one.map((d) => d.gasInTemp) || [0],
                          '冷凝温度': one && one.map((d) => d.condensingTemp) || [0],
                          '蒸发温度': one && one.map((d) => d.evapTemp) || [0],
                          '运行电流': one && one.map((d) => d.ele_flow) || [0],
                          '运行容量': one && one.map((d) => d.ele_total) || [0]
                        }} height={150} />
                      </div>
                    </div>
                  </div>
                })
              }
              {
                this.state.data.outerUnit &&
                this.state.data.outerUnit.length !== 0 && this.state.data.outerUnit.map((outer, index) => {
                  // console.info('outer', outer)
                  return <div key={`outerUnit${index}`} className={styles['item']}>
                    <h4 className={styles['title']}>
                      机组数据(外部-{index})
                      <a title='面板开关' onClick={function () { that.toggleBtn(`outerUnit${index}`) }}>
                        <span style={{ transform: 'rotate(0deg)' }}>
                          <i className='fa fa-thumb-tack' aria-hidden='true' />
                        </span>
                      </a>
                    </h4>
                    <div ref={`outerUnit${index}`}>
                      <TableView pagination={false} columns={columns.outerUnit} data={outer} />
                      <div className={styles['graph']}>
                        <LineGraph data={{
                          '污水侧进水温度': outer && outer.map((d) => d.dirtyWaterInTemp) || [0],
                          '清水侧进水温度': outer && outer.map((d) => d.cleanWaterInTemp) || [0],
                          '污水侧出水温度': outer && outer.map((d) => d.dirtyWaterOutTemp) || [0],
                          '清水侧出水温度': outer && outer.map((d) => d.cleanWaterOutTemp) || [0],
                          '油箱温度': outer && outer.map((d) => d.oilBoxTemp) || [0],
                          '冷凝压力': outer && outer.map((d) => d.condensingPress) || [0],
                          '蒸发压力': outer && outer.map((d) => d.evapPress) || [0],
                          '冷凝压力差': outer && outer.map((d) => d.condensingPressDiff) || [0],
                          '电流载荷': outer && outer.map((d) => d.elecLoad) || [0],
                          '蒸发全温': outer && outer.map((d) => d.evapFullTemp) || [0],
                          '冷凝全温': outer && outer.map((d) => d.condensingFullTemp) || [0]
                        }} height={150} />
                      </div>
                    </div>
                  </div>
                })
              }
              {
                this.state.data.twoUnit &&
                this.state.data.twoUnit.length !== 0 && this.state.data.twoUnit.map((two, index) => {
                  return <div key={`twoUnit${index}`} className={styles['item']}>
                    <h4 className={styles['title']}>
                      机组数据(双-{index})
                      <a title='面板开关' onClick={function () { that.toggleBtn(`twoUnit${index}`) }}>
                        <span style={{ transform: 'rotate(0deg)' }}>
                          <i className='fa fa-thumb-tack' aria-hidden='true' />
                        </span>
                      </a>
                    </h4>
                    <div ref={`twoUnit${index}`}>
                      <TableView pagination={false} columns={columns.twoUnit} data={two} />
                      <div className={styles['graph']}>
                        <LineGraph data={{
                          '污水侧进水温度': two && two.map((d) => d.dirtyWaterInTemp) || [0],
                          '清水侧进水温度': two && two.map((d) => d.cleanWaterInTemp) || [0],
                          '污水侧出水温度': two && two.map((d) => d.dirtyWaterOutTemp) || [0],
                          '清水侧出水温度': two && two.map((d) => d.cleanWaterOutTemp) || [0],
                          '第一排气温度': two && two.map((d) => d.firstGasOutTemp) || [0],
                          '第一吸气温度': two && two.map((d) => d.firstGasInTemp) || [0],
                          '第一冷凝温度': two && two.map((d) => d.firstCondensingTemp) || [0],
                          '第一蒸发温度': two && two.map((d) => d.firstEvapTemp) || [0],
                          '第一运行电流': two && two.map((d) => d.firstEleFlow) || [0],
                          '第一运行容量': two && two.map((d) => d.firstEleTotal) || [0],
                          '第二排气温度': two && two.map((d) => d.secondGasOutTemp) || [0],
                          '第二吸气温度': two && two.map((d) => d.secondGasInTemp) || [0],
                          '第二冷凝温度': two && two.map((d) => d.secondCondensingTemp) || [0],
                          '第二蒸发温度': two && two.map((d) => d.secondEvapTemp) || [0],
                          '第二运行电流': two && two.map((d) => d.secondEleFlow) || [0],
                          '第二运行容量': two && two.map((d) => d.secondEleTotal) || [0],
                          '水箱温度': two && two.map((d) => d.waterBoxTemp) || [0]
                        }} height={150} />
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}
