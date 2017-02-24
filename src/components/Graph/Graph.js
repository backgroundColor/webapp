import React from 'react'
// import styles from './Graph.css'
import C3Chart from 'react-c3js'
type Props = {
  data: Object,
  type: String
}
export default class Graph extends React.Component {
  props: Props

  componentDidMount () {
    // console.info(this.props.data)
  }
  render () {
    const data = {
      columns: [
        ['数据'].concat(this.props.data.map((item) => item.value)) || []
      ],
      type: 'bar'
    }
    const axis = {
      rotated: true,
      x: {
        type: 'category',
        categories: this.props.data.map((item) => item.name) || []
      }
    }
    console.info(data)
    return (
      <div style={{ height: '100%' }}>
        <C3Chart data={data} axis={axis} />
      </div>
    )
  }
}
