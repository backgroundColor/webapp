import React from 'react'
import Plotly from 'plotly.js/lib/core'
import Scatter from 'plotly.js/lib/scatter'
Plotly.register([Scatter])

type Props = {
  unit: String,
  data: Array,
  id: String
}
export default class Plot extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.drawGrph = this.drawGrph.bind(this)
  }

  componentDidMount () {
    setTimeout(this.drawGrph(), 1000)
  }
  // onContainerResize (callback) {
  //   const center = document.querySelector('#content-layout')
  //   const MutationObserver = window.MutationObserver || window.WebkitMutationObserver ||
  //     window.MozMutationObserver
  //   let observer = new MutationObserver(function (mutations) {
  //     callback()
  //   })
  //   const config = { attributes: true }
  //   observer.observe(center, config)
  // }
  drawGrph (data) {
    const layout = {
      hovermode: 'closest',
      xaxis: {
        showline: false,
        showgrid: false,
        color: '#555'
      },
      yaxis: {
        // fixedrange: true,
        showline: false,
        zeroline: false,
        linecolor: '#757575',
        color: '#555',
        title: this.props.unit ? `数据单位(${this.props.unit})` : ''
      },
      margin: {
        l: 70, b: 30, r: 60, t: 50
      }

    }

    Plotly.newPlot(this.props.id, data, layout).then((result) => {
      window.addEventListener('resize', function (data) {
        Plotly.Plots.resize(result)
      })
      // this.onContainerResize(() => {
      //   Plotly.Plots.resize(result)
      // })
    })
  }
  render () {
    return (
      <div id={this.props.id} ref={this.props.id} style={{ height: '90%' }} />
    )
  }
}
