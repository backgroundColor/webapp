import React from 'react'
import C3Chart from 'react-c3js'
type Props = {
  data: Object
}
export default class LineGraph extends React.Component {
  props: Props
  componentDidMount () {
    console.info(this.props.data)
  }
  render () {
    const data = {
      columns: [
        ['数据', 1, 3, 5, 4]
      ]
    }
    const axis = {
      x: {
        type: 'category',
        categories: []
      }
    }
    const padding = {
      top: 40,
      right: 100,
      bottom: 40,
      left: 100
    }
    console.info(data)
    return (
      <div style={{ height: '100%' }}>
        <C3Chart data={data} axis={axis} />
      </div>
    )
  }
}
