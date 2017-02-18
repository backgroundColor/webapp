import React from 'react'
import styles from './Histroy.css'
import ProSelectTime from '../ProSelectTime'
import TableView from '../TableView'
import { notification, Pagination } from 'antd'
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
    console.log(this.state.val)
    this.getData(this.state.val, val)
  }
  getProId (val) {
    // console.info(data)
    this.setState({ val })
    this.getData(val, 1)
  }
  getData (val, page) {
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
      high: [{ title: '供水温度', dataIndex: 'supply_water_temp' },
        { title: '回水温度', dataIndex: 'back_water_temp' },
        { title: '室内温度', dataIndex: 'house_temp' },
        { title: '供水压力', dataIndex: 'supply_water_press' },
        { title: '回水压力', dataIndex: 'back_water_press' },
        { title: '高区流量', dataIndex: 'water_flow' }
      ],
      media: [{ title: '供水温度', dataIndex: 'supply_water_temp' },
        { title: '回水温度', dataIndex: 'back_water_temp' },
        { title: '室内温度', dataIndex: 'house_temp' },
        { title: '供水压力', dataIndex: 'supply_water_press' },
        { title: '回水压力', dataIndex: 'back_water_press' },
        { title: '中区区流量', dataIndex: 'water_flow' }
      ],
      low: [{ title: '供水温度', dataIndex: 'supply_water_temp' },
        { title: '回水温度', dataIndex: 'back_water_temp' },
        { title: '室内温度', dataIndex: 'house_temp' },
        { title: '供水压力', dataIndex: 'supply_water_press' },
        { title: '回水压力', dataIndex: 'back_water_press' },
        { title: '低区流量', dataIndex: 'water_flow' }
      ],
      transBox: [{ title: 'A相温度', dataIndex: 'a_tem' },
        { title: 'B相温度', dataIndex: 'b_tem' },
        { title: 'C相温度', dataIndex: 'c_tem' },
        { title: 'A相电流', dataIndex: 'a_ele' },
        { title: 'B相电流', dataIndex: 'b_ele' },
        { title: 'C相电流', dataIndex: 'c_ele' },
        { title: 'A相电压', dataIndex: 'a_pre' },
        { title: 'B相电压', dataIndex: 'b_pre' },
        { title: 'C相电压', dataIndex: 'c_pre' },
        { title: '有功功率', dataIndex: 'has_power' },
        { title: '无功功率', dataIndex: 'no_power' },
        { title: '频率', dataIndex: 'rate' }
      ],
      unit: [{ title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp' },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp' },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp' },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp' },
        { title: '水箱温度', dataIndex: 'waterBoxTemp' },
        { title: '排气温度', dataIndex: 'gasOutTemp' },
        { title: '吸气温度', dataIndex: 'gasInTemp' },
        { title: '冷凝温度', dataIndex: 'condensingTemp' },
        { title: '蒸发温度', dataIndex: 'evapTemp' },
        { title: '运行电流', dataIndex: 'ele_flow' },
        { title: '运行容量', dataIndex: 'ele_total' }
      ],
      twoUnit: [{ title: '污水侧进水温度', dataIndex: 'dirtyWaterInTemp' },
        { title: '清水侧进水温度', dataIndex: 'cleanWaterInTemp' },
        { title: '污水侧出水温度', dataIndex: 'dirtyWaterOutTemp' },
        { title: '清水侧出水温度', dataIndex: 'cleanWaterOutTemp' },
        { title: '第一排气温度', dataIndex: 'firstGasOutTemp' },
        { title: '第一吸气温度', dataIndex: 'firstGasInTemp' },
        { title: '第一冷凝温度', dataIndex: 'firstCondensingTemp' },
        { title: '第一蒸发温度', dataIndex: 'firstEvapTemp' },
        { title: '第一运行电流', dataIndex: 'firstEleFlow' },
        { title: '第一运行容量', dataIndex: 'firstEleTotal' },
        { title: '第二排气温度', dataIndex: 'secondGasOutTemp' },
        { title: '第二吸气温度', dataIndex: 'secondGasInTemp' },
        { title: '第二冷凝温度', dataIndex: 'secondCondensingTemp' },
        { title: '第二蒸发温度', dataIndex: 'secondEvapTemp' },
        { title: '第二运行电流', dataIndex: 'secondEleFlow' },
        { title: '第二运行容量', dataIndex: 'secondEleTotal' },
        { title: '水箱温度', dataIndex: 'waterBoxTemp' }
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
