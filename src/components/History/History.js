import React from 'react'
import styles from './Histroy.css'
import ProSelectTime from '../ProSelectTime'
import TableView from '../TableView'
import { notification, Pagination, Spin, Tabs } from 'antd'
import R from 'ramda'
import { universalFetch } from 'modules/fetch'
const TabPane = Tabs.TabPane

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
    // console.info(val)
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
      high: [
        { title: '时间', dataIndex: 'createTime', key: 1, width: 120 },
        { title: '供水温度', dataIndex: 'supply_water_temp', key: 2, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 3, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 4, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 5, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 6, render: (text) => <span>{text}Pa</span> },
        { title: '高区流量', dataIndex: 'water_flow', key: 7, render: (text) => <span>{text}cc</span> },
        // { title: '泵电流数据', key: 80, children: [
        //   {
        //     title: '名称',
        //     dataIndex: 'benElcDatas.name',
        //     key: 'benEleName'
        //   },
        //   {
        //     title: '泵电流',
        //     dataIndex: 'benElcDatas.ben_ele',
        //     key: 'benEle'
        //   }
        // ] }
      ],
      media: [
        { title: '时间', dataIndex: 'createTime', key: 8, width: 120 },
        { title: '供水温度', dataIndex: 'supply_water_temp', key: 9, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 10, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 11, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 12, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 13, render: (text) => <span>{text}Pa</span> },
        { title: '中区区流量', dataIndex: 'water_flow', key: 14, render: (text) => <span>{text}cc</span> }
      ],
      low: [
        { title: '时间', dataIndex: 'createTime', key: 15, width: 120 },
        { title: '供水温度', dataIndex: 'supply_water_temp', key: 16, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 17, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 18, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 19, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 20, render: (text) => <span>{text}Pa</span> },
        { title: '低区流量', dataIndex: 'water_flow', key: 21, render: (text) => <span>{text}cc</span> }
      ],
      transBox: [
        { title: '时间', dataIndex: 'createTime', key: 22, width: 120 },
        { title: 'A相温度', dataIndex: 'a_tem', key: 23, render: (text) => <span>{text}°C</span> },
        { title: 'B相温度', dataIndex: 'b_tem', key: 24, render: (text) => <span>{text}°C</span> },
        { title: 'C相温度', dataIndex: 'c_tem', key: 25, render: (text) => <span>{text}°C</span> },
        { title: 'A相电流', dataIndex: 'a_ele', key: 26, render: (text) => <span>{text}A</span> },
        { title: 'B相电流', dataIndex: 'b_ele', key: 27, render: (text) => <span>{text}A</span> },
        { title: 'C相电流', dataIndex: 'c_ele', key: 28, render: (text) => <span>{text}A</span> },
        { title: 'A相电压', dataIndex: 'a_pre', key: 29, render: (text) => <span>{text}V</span> },
        { title: 'B相电压', dataIndex: 'b_pre', key: 30, render: (text) => <span>{text}V</span> },
        { title: 'C相电压', dataIndex: 'c_pre', key: 31, render: (text) => <span>{text}V</span> },
        { title: '有功功率', dataIndex: 'has_power', key: 32, render: (text) => <span>{text}W</span> },
        { title: '无功功率', dataIndex: 'no_power', key: 33, render: (text) => <span>{text}W</span> },
        { title: '频率', dataIndex: 'rate', key: 34, render: (text) => <span>{text}Hz</span> }
      ],
      unit: [
        { title: '时间', dataIndex: 'createTime', key: 35, width: 120 },
        { title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key: 36, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 37, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 38, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 39, render: (text) => <span>{text}°C</span> },
        { title: '水箱温度', dataIndex: 'waterBoxTemp', key: 40, render: (text) => <span>{text}°C</span> },
        { title: '排气温度', dataIndex: 'gasOutTemp', key: 41, render: (text) => <span>{text}°C</span> },
        { title: '吸气温度', dataIndex: 'gasInTemp', key: 42, render: (text) => <span>{text}°C</span> },
        { title: '冷凝温度', dataIndex: 'condensingTemp', key: 43, render: (text) => <span>{text}°C</span> },
        { title: '蒸发温度', dataIndex: 'evapTemp', key: 44, render: (text) => <span>{text}°C</span> },
        { title: '运行电流', dataIndex: 'ele_flow', key: 45, render: (text) => <span>{text}A</span> },
        { title: '运行容量', dataIndex: 'ele_total', key: 46, render: (text) => <span>{text}F</span> }
      ],
      twoUnit: [
        { title: '时间', dataIndex: 'createTime', key: 47, width: 120 },
        { title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key:48, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 49, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 50, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 51, render: (text) => <span>{text}°C</span> },
        { title: '第一排气温度', dataIndex: 'firstGasOutTemp', key: 52, render: (text) => <span>{text}°C</span> },
        { title: '第一吸气温度', dataIndex: 'firstGasInTemp', key: 53, render: (text) => <span>{text}°C</span> },
        { title: '第一冷凝温度', dataIndex: 'firstCondensingTemp', key: 54, render: (text) => <span>{text}°C</span> },
        { title: '第一蒸发温度', dataIndex: 'firstEvapTemp', key: 55, render: (text) => <span>{text}°C</span> },
        { title: '第一运行电流', dataIndex: 'firstEleFlow', key: 56, render: (text) => <span>{text}A</span> },
        { title: '第一运行容量', dataIndex: 'firstEleTotal', key: 57, render: (text) => <span>{text}F</span> },
        { title: '第二排气温度', dataIndex: 'secondGasOutTemp', key: 58, render: (text) => <span>{text}°C</span> },
        { title: '第二吸气温度', dataIndex: 'secondGasInTemp', key: 59, render: (text) => <span>{text}°C</span> },
        { title: '第二冷凝温度', dataIndex: 'secondCondensingTemp', key: 60, render: (text) => <span>{text}°C</span> },
        { title: '第二蒸发温度', dataIndex: 'secondEvapTemp', key: 61, render: (text) => <span>{text}°C</span> },
        { title: '第二运行电流', dataIndex: 'secondEleFlow', key: 62, render: (text) => <span>{text}A</span> },
        { title: '第二运行容量', dataIndex: 'secondEleTotal', key: 63, render: (text) => <span>{text}F</span> },
        { title: '水箱温度', dataIndex: 'waterBoxTemp', key: 64, render: (text) => <span>{text}°C</span> }
      ],
      outerUnit: [
        { title: '时间', dataIndex: 'createTime', key: 65, width: 120 },
        { title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key:66, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 67, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 68, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 69, render: (text) => <span>{text}°C</span> },
        { title: '油箱温度', dataIndex: 'oilBoxTemp', key: 70, render: (text) => <span>{text}°C</span> },
        { title: '冷凝压力', dataIndex: 'condensingPress', key: 71, render: (text) => <span>{text}°C</span> },
        { title: '蒸发压力', dataIndex: 'evapPress', key: 72, render: (text) => <span>{text}°C</span> },
        { title: '冷凝压力差', dataIndex: 'condensingPressDiff', key: 73, render: (text) => <span>{text}°C</span> },
        { title: '电流载荷', dataIndex: 'elecLoad', key: 74, render: (text) => <span>{text}A</span> },
        { title: '蒸发全温', dataIndex: 'evapFullTemp', key: 75, render: (text) => <span>{text}F</span> },
        { title: '冷凝全温', dataIndex: 'condensingFullTemp', key: 76, render: (text) => <span>{text}°C</span> }
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
                      <TableView pagination={false} columns={columns.high} data={this.state.data.high} />
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
                      <TableView pagination={false} columns={columns.media} data={this.state.data.media} />
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
                      <TableView pagination={false} columns={columns.low} data={this.state.data.low} />
                    </div>
                  </div>
                </TabPane>
                {
                  this.state.data.transBox &&
                  this.state.data.transBox.length !== 0 && this.state.data.transBox.map((item, index) => {
                    return <TabPane tab={`变压器${index + 1}`} key={`transbox${index}`} >
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
                          <TableView pagination={false}
                            data={item}
                            columns={columns.transBox} />
                        </div>
                      </div>
                    </TabPane>
                  })
                }
                {
                  this.state.data.oneUnit &&
                  this.state.data.oneUnit.length !== 0 && this.state.data.oneUnit.map((one, index) => {
                    return <TabPane tab={`机组数据(单-${index})`} key={`oneUnit${index}`} >
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
                          <TableView pagination={false} columns={columns.unit} data={one} />
                        </div>
                      </div>
                    </TabPane>
                  })
                }
                {
                  this.state.data.outerUnit &&
                  this.state.data.outerUnit.length !== 0 && this.state.data.outerUnit.map((outer, index) => {
                    return <TabPane tab={`机组数据(外部-${index})`} key={`outerUnit${index}`} >
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
                          <TableView pagination={false} columns={columns.outerUnit} data={outer} />
                        </div>
                      </div>
                    </TabPane>
                  })
                }
                {
                  this.state.data.twoUnit &&
                  this.state.data.twoUnit.length !== 0 && this.state.data.twoUnit.map((two, index) => {
                    return <TabPane tab={`机组数据(双-${index})`} key={`twoUnit${index}`} >
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
                          <TableView pagination={false} columns={columns.twoUnit} data={two} />
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
