import React from 'react'
import C3Chart from 'react-c3js'
import R from 'ramda'
import moment from 'moment'
type Props = {
  data: Object,
  height: Number,
  axis: Array
}
export default class HomeGraph extends React.Component {
  props: Props
  componentDidMount () {
    // console.info(this.props.data)
  }
  componentDidUpdate () {
    // console.info(this.props.axis instanceof Array)
  }
  render () {
    const data = {
      x: 'x',
      xFormat: '%H:%M',
      type: 'spline',
      columns: R.keys(this.props.data).map((item) => {
        return [item].concat(this.props.data[item])
      }) || []
    }
    const axis = {
      x: {
        type : 'timeseries',
        tick: {
          format: '%H:%M'
        }
      },
      y: {
        tick: {
          count: 3,
          format: (d) => d.toFixed(1)
        }
      }
    }
    const padding = {
      top: 10,
      right: 20,
      bottom: 20,
      left: 50
    }
    const size = {
      height: this.props.height || 150
    }
    const tooltip = {
      format: {
        title: (d) => { return '数据 ' + moment(d).format('HH:mm') },
        value: (value, ratio, id) => {
          // console.log(ratio)
          // if (id.indexOf('温') !== -1) {
          //   return value + '°C'
          // }
          // if (id.indexOf('能') !== -1) {
          //   return value + '°C'
          // }
          return value
          // switch (id) {
          //   case '高温':
          //   case '中温':
          //   case '低温':
          //     return value + '°C'
          //   case '能耗':
          //     return value + 'W'
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
