import React from 'react'
import styles from './GraphView.css'
import ProSelectTime from '../ProSelectTime'
import { notification, Pagination, Spin, Tabs } from 'antd'
import LineGraph from '../LineGraph'
import R from 'ramda'
const TabPane = Tabs.TabPane
import { universalFetch } from 'modules/fetch'
export default class GraphView extends React.Component {

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
              <Tabs defaultActiveKey='1'>
                <TabPane tab='高区' key='1'>
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
                      <div className={styles['graph']}>
                        <LineGraph data={{
                          '供水温度': this.state.data.high && this.state.data.high.map((item) => item.supply_water_temp) || [0],
                          '回水温度': this.state.data.high && this.state.data.high.map((item) => item.back_water_temp) || [0],
                          '室内温度': this.state.data.high && this.state.data.high.map((item) => item.house_temp) || [0],
                          '供水压力': this.state.data.high && this.state.data.high.map((item) => item.supply_water_press) || [0],
                          '回水压力': this.state.data.high && this.state.data.high.map((item) => item.back_water_press) || [0],
                          '高区流量': this.state.data.high && this.state.data.high.map((item) => item.water_flow) || [0]
                        }} height={300} />
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab='中区' key='2'>
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
                      <div className={styles['graph']}>
                        <LineGraph data={{
                          '供水温度': this.state.data.media && this.state.data.media.map((item) => item.supply_water_temp) || [0],
                          '回水温度': this.state.data.media && this.state.data.media.map((item) => item.back_water_temp) || [0],
                          '室内温度': this.state.data.media && this.state.data.media.map((item) => item.house_temp) || [0],
                          '供水压力': this.state.data.media && this.state.data.media.map((item) => item.supply_water_press) || [0],
                          '回水压力': this.state.data.media && this.state.data.media.map((item) => item.back_water_press) || [0],
                          '中区流量': this.state.data.media && this.state.data.media.map((item) => item.water_flow) || [0]
                        }} height={300} />
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab='低区' key='3'>
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
                      <div className={styles['graph']}>
                        <LineGraph data={{
                          '供水温度': this.state.data.low && this.state.data.low.map((item) => item.supply_water_temp) || [0],
                          '回水温度': this.state.data.low && this.state.data.low.map((item) => item.back_water_temp) || [0],
                          '室内温度': this.state.data.low && this.state.data.low.map((item) => item.house_temp) || [0],
                          '供水压力': this.state.data.low && this.state.data.low.map((item) => item.supply_water_press) || [0],
                          '回水压力': this.state.data.low && this.state.data.low.map((item) => item.back_water_press) || [0],
                          '低区流量': this.state.data.low && this.state.data.low.map((item) => item.water_flow) || [0]
                        }} height={300} />
                      </div>
                    </div>
                  </div>
                </TabPane>
                {
                  this.state.data.transBox &&
                  this.state.data.transBox.length !== 0 && this.state.data.transBox.map((item, index) => {
                    return <TabPane tab={`变压器${index + 1}`} key={`transbox${index}`}>
                      <div className={styles['item']}>
                        <h4 className={styles['title']}>
                          变压器{index + 1}
                          <a title='面板开关' onClick={function () { that.toggleBtn(`transBox${index}`) }}>
                            <span style={{ transform: 'rotate(0deg)' }}>
                              <i className='fa fa-thumb-tack' aria-hidden='true' />
                            </span>
                          </a>
                        </h4>
                        <div ref={`transBox${index}`}>
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
                            }} height={300} />
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  })
                }
                {
                  this.state.data.oneUnit &&
                  this.state.data.oneUnit.length !== 0 && this.state.data.oneUnit.map((one, index) => {
                    return <TabPane tab={`机组数据(单-${index})`} key={`oneUnit${index}`}>
                      <div className={styles['item']}>
                        <h4 className={styles['title']}>
                          机组数据(单-{index})
                          <a title='面板开关' onClick={function () { that.toggleBtn(`oneUnit${index}`) }}>
                            <span style={{ transform: 'rotate(0deg)' }}>
                              <i className='fa fa-thumb-tack' aria-hidden='true' />
                            </span>
                          </a>
                        </h4>
                        <div ref={`oneUnit${index}`}>
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
                            }} height={300} />
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  })
                }
                {
                  this.state.data.outerUnit &&
                  this.state.data.outerUnit.length !== 0 && this.state.data.outerUnit.map((outer, index) => {
                    return <TabPane tab={`机组数据(外部-${index})`} key={`outerUnit${index}`}>
                      <div className={styles['item']}>
                        <h4 className={styles['title']}>
                          机组数据(外部-{index})
                          <a title='面板开关' onClick={function () { that.toggleBtn(`outerUnit${index}`) }}>
                            <span style={{ transform: 'rotate(0deg)' }}>
                              <i className='fa fa-thumb-tack' aria-hidden='true' />
                            </span>
                          </a>
                        </h4>
                        <div ref={`outerUnit${index}`}>
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
                            }} height={300} />
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  })
                }
                {
                  this.state.data.twoUnit &&
                  this.state.data.twoUnit.length !== 0 && this.state.data.twoUnit.map((two, index) => {
                    return <TabPane tab={`机组数据(双-${index})`} key={`twoUnit${index}`}>
                      <div className={styles['item']}>
                        <h4 className={styles['title']}>
                          机组数据(双-{index})
                          <a title='面板开关' onClick={function () { that.toggleBtn(`twoUnit${index}`) }}>
                            <span style={{ transform: 'rotate(0deg)' }}>
                              <i className='fa fa-thumb-tack' aria-hidden='true' />
                            </span>
                          </a>
                        </h4>
                        <div ref={`twoUnit${index}`}>
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
                            }} height={300} />
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  })
                }
              </Tabs>
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}
