import React from 'react'
// import { BaiduMap } from 'react-baidu-map'
export default class Map extends React.Component {

  componentDidMount () {
    this.createMap()
  }
  createMap () {
    const map = new BMap.Map('allmap')    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl())   //添加地图类型控件
    map.setCurrentCity('北京')          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true)
  }
  render () {
    return (
      <div style={{ height: '100%' }} id='allmap' />
    )
  }
}
