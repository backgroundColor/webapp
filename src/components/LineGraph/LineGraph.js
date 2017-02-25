import React from 'react'
import C3Chart from 'react-c3js'
import R from 'ramda'
type Props = {
  data: Object
}
export default class LineGraph extends React.Component {
  props: Props
  componentDidMount () {
    // console.info(this.props.data)
  }
  componentDidUpdate () {
    // console.info(this.props.data)
  }
  render () {
    const data = {
      columns: R.keys(this.props.data).map((item) => {
        return [item].concat(this.props.data[item])
      })
    }
    const axis = {
      x: {
        type: 'category',
        categories: []
      }
    }
    const padding = {
      top: 10,
      right: 20,
      bottom: 0,
      left: 50
    }
    const size = {
      height: 150
    }
    const tooltip = {
      format: {
        title: (d) => { return '数据 ' + d },
        value: (value, ratio, id) => {
          return value
          // switch (id) {
          //   case '供水温度':
          //   case '回水温度':
          //   case '室内温度':
          //     return value + '°C'
          //   case '供水压力':
          //   case '回水压力':
          //     return value + 'Pa'
          //   case '高区流量':
          //     return value + 'cc'
          //   default:
          //     return value
          // }
        },
        position: function (data, width, height, element) {
          return { top: 0, left: 0 }
        }
      }
    }
    return (
      <div style={{ height: '100%' }}>
        <C3Chart data={data} axis={axis}
          size={size}
          tooltip={tooltip}
          padding={padding} />
      </div>
    )
  }
}
