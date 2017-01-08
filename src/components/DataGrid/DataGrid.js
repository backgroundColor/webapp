import React from 'react'
import echarts from 'echarts'
import bar from 'echarts/lib/chart/bar'
export default class DataGrid extends React.Component {

  componentDidMount () {
    this.createGrid()
  }
  createGrid () {
    var myChart = echarts.init(document.getElementById('main'))
    myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    })
  }
  render () {
    return (
      <div id='main' style={{height: '100%'}}></div>
    )
  }
}
