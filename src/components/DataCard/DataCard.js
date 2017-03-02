import React from 'react'
import { Card, Row, Col } from 'antd'
import styles from './DataCard.css'
// import DataGrid from '../DataGrid'
import Graph from '../Graph'
type Props = {
  title: string,
  data: array
}
export default class DataCard extends React.Component {
  props: Props
  state = {
    show: 'message'
  }
  constructor (props) {
    super(props)
    this.showGrid = this.showGrid.bind(this)
  }

  componentDidMount () {
  }
  showGrid () {
    console.info(this.refs['gridbody'].offsetHeight)
    this.setState({
      show: this.state.show === 'message' ? 'grid' : 'message',
      cardH: this.refs['gridbody'].offsetHeight
    })
  }
  render () {
    const { show } = this.state
    return (
      <div className={styles['datagrid']}>
        <Row>
          <Col>
            <Card title={this.props.title}
              extra={<a href='javascript:;' onClick={this.showGrid}>
                <i className='fa fa-area-chart' aria-hidden='true' /></a>}>
              <div className={styles['gridbody']} ref='gridbody'
                style={{ display: show === 'message' ? 'block' : 'none' }}>
                {
                  this.props.data && this.props.data.map((item, index) => {
                    return <p className={styles['item-data']} key={`data${index}`}>
                      {item.name}:&nbsp;&nbsp;{item.value || '0'}
                      {
                        (() => {
                          if (item.name.indexOf('温度') > 0) {
                            return '°C'
                          }
                          if (item.name.indexOf('压力') > 0) {
                            return 'Pa'
                          }
                          if (item.name.indexOf('流量') > 0) {
                            return 'cc'
                          }
                          if (item.name.indexOf('电流') > 0) {
                            return 'A'
                          }
                          if (item.name.indexOf('电压') > 0) {
                            return 'V'
                          }
                          if (item.name.indexOf('功率') > 0) {
                            return 'W'
                          }
                          if (item.name.indexOf('容量') > 0) {
                            return 'cc'
                          }
                        })()
                      }
                    </p>
                  })
                }
              </div>
              <div className={styles['gridbody']}
                style={{ display: show === 'grid' ? 'block' : 'none', height: `${this.state.cardH}px` }}>
                <Graph data={this.props.data} type='bar' />
                {
                  // <DataGrid data={this.props.data} />
                }
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
