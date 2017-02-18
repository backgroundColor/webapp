import React from 'react'
import Plotly from 'plotly.js/lib/core'
import bar from 'plotly.js/lib/bar'
// import R from 'ramda'
// import moment from 'moment'
// import classes from './HomeDataGrid.scss'
// import { universalFetch } from 'modules/fetch'
Plotly.register([bar])
type Props = {
  data: Array
}
export default class PlotBar extends React.Component {
  props: Props

  componentDidMount () {
    // console.info(this.props.data)
    // this.createGrid(this.props.data)
  }

  componentDidUpdate () {
    this.createGrid(this.props.data)
  }

  createGrid (rel) {
    const data = [{
      x: rel.map((data) => data.name),
      y: rel.map((data) => data.value),
      type: 'bar'
    }]
    const layout = {
      showlegend: false,
      hovermode: true,
      autoresize: true,
      gridcolor: 'rgb(245, 250, 255)',
      legend: {
        x: 10,
        y: 1,
        traceorder: 'normal'
      },
      xaxis: {
        autorange: true,
        fixedrange: true,
        showgrid: false,
        showline: true,
        zeroline: true
      },
      yaxis: {
        autorange: true,
        showgrid: true,
        showline: true,
        fixedrange: true
      },
      margin: {
        l: 40,
        b: 80,
        r: 30,
        t: 30
      }
    }
    Plotly.newPlot(this.refs.myDiv, data, layout, { displayModeBar: false })
    .then((result) => {
      window.addEventListener('resize', (data) => {
        Plotly.Plots.resize(result)
      })
      // this.onContainerResize(() => {
      //   Plotly.Plots.resize(result)
      // })
    })
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

  render () {
    return (
      <div ref='myDiv' id='myDiv' style={{ height: '100%', padding: '5px 0px' }}>
      </div>
    )
  }
}
