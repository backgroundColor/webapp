import React from 'react'
import styles from './Histroy.css'
import ProSelectTime from '../ProSelectTime'
import TableView from '../TableView'
import { notification, Pagination } from 'antd'
import LineGraph from '../LineGraph'
export default class History extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
      total: 1,
      val: {}
    }
    this.getProId = this.getProId.bind(this)
    this.getData = this.getData.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }
  componentDidUpdate () {
    // console.info(this.state.data)
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
  getData (val, page) {
    // FIX ME 后台需要加时间过滤, 加时间过滤后开启以下代码
    // fetch(`${__TASK_URL__}history?id=${val.id}&page=${page}&size=10&start=${val.start}&end=${val.end}`)
    fetch(`${__TASK_URL__}history?id=${val.id}&page=${page}&size=10`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      // console.info(json)
      this.setState({
        data: {
          high: json.body.items.map((d) => d.high) || [],
          media: json.body.items.map((d) => d.median) || [],
          low: json.body.items.map((d) => d.low) || [],
          transBox: json.body.items.map((d) => d.t_f) || [],
          oneUnit: json.body.items.map((d) => d.oneUnit) || [],
          outerUnit: json.body.items.map((d) => d.outerUnit) || [],
          twoUnit: json.body.items.map((d) => d.twoUnit) || []
        },
        total: json.body.info.total
      })
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
    const columns = {
      high: [{ title: '供水温度', dataIndex: 'supply_water_temp', key: 1, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 2, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 3, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 4, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 5, render: (text) => <span>{text}Pa</span> },
        { title: '高区流量', dataIndex: 'water_flow', key: 6, render: (text) => <span>{text}cc</span> }
      ],
      media: [{ title: '供水温度', dataIndex: 'supply_water_temp', key: 1, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 2, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 3, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 4, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 5, render: (text) => <span>{text}Pa</span> },
        { title: '中区区流量', dataIndex: 'water_flow', key: 6, render: (text) => <span>{text}cc</span> }
      ],
      low: [{ title: '供水温度', dataIndex: 'supply_water_temp', key: 1, render: (text) => <span>{text}°C</span> },
        { title: '回水温度', dataIndex: 'back_water_temp', key: 2, render: (text) => <span>{text}°C</span> },
        { title: '室内温度', dataIndex: 'house_temp', key: 3, render: (text) => <span>{text}°C</span> },
        { title: '供水压力', dataIndex: 'supply_water_press', key: 4, render: (text) => <span>{text}Pa</span> },
        { title: '回水压力', dataIndex: 'back_water_press', key: 5, render: (text) => <span>{text}Pa</span> },
        { title: '低区流量', dataIndex: 'water_flow', key: 6, render: (text) => <span>{text}cc</span> }
      ],
      transBox: [{ title: 'A相温度', dataIndex: 'a_tem', key: 1, render: (text) => <span>{text}°C</span> },
        { title: 'B相温度', dataIndex: 'b_tem', key: 2, render: (text) => <span>{text}°C</span> },
        { title: 'C相温度', dataIndex: 'c_tem', key: 3, render: (text) => <span>{text}°C</span> },
        { title: 'A相电流', dataIndex: 'a_ele', key: 4, render: (text) => <span>{text}A</span> },
        { title: 'B相电流', dataIndex: 'b_ele', key: 5, render: (text) => <span>{text}A</span> },
        { title: 'C相电流', dataIndex: 'c_ele', key: 6, render: (text) => <span>{text}A</span> },
        { title: 'A相电压', dataIndex: 'a_pre', key: 7, render: (text) => <span>{text}V</span> },
        { title: 'B相电压', dataIndex: 'b_pre', key: 8, render: (text) => <span>{text}V</span> },
        { title: 'C相电压', dataIndex: 'c_pre', key: 9, render: (text) => <span>{text}V</span> },
        { title: '有功功率', dataIndex: 'has_power', key: 10, render: (text) => <span>{text}W</span> },
        { title: '无功功率', dataIndex: 'no_power', key: 11, render: (text) => <span>{text}W</span> },
        { title: '频率', dataIndex: 'rate', key: 12, render: (text) => <span>{text}Hz</span> }
      ],
      unit: [{ title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key: 1, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 2, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 3, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 4, render: (text) => <span>{text}°C</span> },
        { title: '水箱温度', dataIndex: 'waterBoxTemp', key: 5, render: (text) => <span>{text}°C</span> },
        { title: '排气温度', dataIndex: 'gasOutTemp', key: 6, render: (text) => <span>{text}°C</span> },
        { title: '吸气温度', dataIndex: 'gasInTemp', key: 7, render: (text) => <span>{text}°C</span> },
        { title: '冷凝温度', dataIndex: 'condensingTemp', key: 8, render: (text) => <span>{text}°C</span> },
        { title: '蒸发温度', dataIndex: 'evapTemp', key: 9, render: (text) => <span>{text}°C</span> },
        { title: '运行电流', dataIndex: 'ele_flow', key: 10, render: (text) => <span>{text}A</span> },
        { title: '运行容量', dataIndex: 'ele_total', key: 11, render: (text) => <span>{text}F</span> }
      ],
      twoUnit: [{ title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp', key:1, render: (text) => <span>{text}°C</span> },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp', key: 2, render: (text) => <span>{text}°C</span> },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp', key: 3, render: (text) => <span>{text}°C</span> },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp', key: 4, render: (text) => <span>{text}°C</span> },
        { title: '第一排气温度', dataIndex: 'firstGasOutTemp', key: 5, render: (text) => <span>{text}°C</span> },
        { title: '第一吸气温度', dataIndex: 'firstGasInTemp', key: 6, render: (text) => <span>{text}°C</span> },
        { title: '第一冷凝温度', dataIndex: 'firstCondensingTemp', key: 7, render: (text) => <span>{text}°C</span> },
        { title: '第一蒸发温度', dataIndex: 'firstEvapTemp', key: 8, render: (text) => <span>{text}°C</span> },
        { title: '第一运行电流', dataIndex: 'firstEleFlow', key: 9, render: (text) => <span>{text}A</span> },
        { title: '第一运行容量', dataIndex: 'firstEleTotal', key: 10, render: (text) => <span>{text}F</span> },
        { title: '第二排气温度', dataIndex: 'secondGasOutTemp', key: 11, render: (text) => <span>{text}°C</span> },
        { title: '第二吸气温度', dataIndex: 'secondGasInTemp', key: 12, render: (text) => <span>{text}°C</span> },
        { title: '第二冷凝温度', dataIndex: 'secondCondensingTemp', key: 13, render: (text) => <span>{text}°C</span> },
        { title: '第二蒸发温度', dataIndex: 'secondEvapTemp', key: 14, render: (text) => <span>{text}°C</span> },
        { title: '第二运行电流', dataIndex: 'secondEleFlow', key: 15, render: (text) => <span>{text}A</span> },
        { title: '第二运行容量', dataIndex: 'secondEleTotal', key: 16, render: (text) => <span>{text}F</span> },
        { title: '水箱温度', dataIndex: 'waterBoxTemp', key: 17, render: (text) => <span>{text}°C</span> }
      ]

    }
    return (
      <div className={styles['container']}>
        <strong>数据中心</strong>
        <div><ProSelectTime getProId={this.getProId} /></div>
        <div className={styles['content']}>
          <div className={styles['view']}>
            <div className={styles['controll']}>
              <Pagination defaultCurrent={1} total={this.state.total} onChange={this.pageChange} />
            </div>
            <div className={styles['item']}>
              <h4 className={styles['title']}>
                高区
              </h4>
              <div>
                <TableView pagination={false} columns={columns.high} data={this.state.data.high} />
                <div className={styles['graph']}>
                  <LineGraph data={this.state.data.high} />
                </div>
              </div>
            </div>
            <div className={styles['item']}>
              <h4 className={styles['title']}>
                中区
              </h4>
              <div>
                <TableView pagination={false} columns={columns.media} data={this.state.data.media} />
              </div>
            </div>
            <div className={styles['item']}>
              <h4 className={styles['title']}>
                低区
              </h4>
              <div>
                <TableView pagination={false} columns={columns.low} data={this.state.data.low} />
              </div>
            </div>
            {
              this.state.data.transBox &&
              this.state.data.transBox.length !== 0 && this.state.data.transBox.map((item, index) => {
                return <div key={`transbox${index}`} className={styles['item']}>
                  <h4 className={styles['title']}>
                    变压器{index + 1}
                  </h4>
                  <div>
                    <TableView pagination={false}
                      data={item}
                      columns={columns.transBox} />
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
                  </h4>
                  <div>
                    <TableView pagination={false} columns={columns.unit} data={one} />
                  </div>
                </div>
              })
            }
            {
              this.state.data.outerUnit &&
              this.state.data.outerUnit.length !== 0 && this.state.data.outerUnit.map((outer, index) => {
                return <div key={`outerUnit${index}`} className={styles['item']}>
                  <h4 className={styles['title']}>
                    机组数据(外部-{index})
                  </h4>
                  <div>
                    <TableView pagination={false} columns={columns.unit} data={outer} />
                  </div>
                </div>
              })
            }
            {
              this.state.data.tworUnit &&
              this.state.data.twoUnit.length !== 0 && this.state.data.twoUnit.map((two, index) => {
                return <div key={`twoUnit${index}`} className={styles['item']}>
                  <h4 className={styles['title']}>
                    机组数据(外部-{index})
                  </h4>
                  <div>
                    <TableView pagination={false} columns={columns.unit} data={two} />
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
