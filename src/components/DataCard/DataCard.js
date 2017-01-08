import React from 'react'
import { Card, Row, Col } from 'antd'
import styles from './DataCard.css'
import DataGrid from '../DataGrid'

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

  showGrid () {
    this.setState({
      show: this.state.show === 'message' ? 'grid' : 'message'
    })
  }
  render () {
    const {show} = this.state
    return (
      <div className={styles['datagrid']}>
        <Row>
          <Col>
            <Card title={this.props.title} bordered={true}
            extra={<a href="javascript:;" onClick={this.showGrid}><i className='fa fa-area-chart' aria-hidden='true'></i></a>}>
              <div className={styles['gridbody']} style={{display: show === 'message' ? 'block': 'none'}}>
                {
                  this.props.data && this.props.data.map((item, index) => {
                    return <p key={`data${index}`}>{item.name}{item.value}</p>
                  })
                }
              </div>
              <div className={styles['gridbody']} className={styles['grid']} style={{display: show === 'grid' ? 'block': 'none'}}>
                <DataGrid />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
