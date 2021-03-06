import React from 'react'
import R from 'ramda'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { universalFetch } from 'modules/fetch'
type Props = {
  onClick: Function,
  push: Function,
  city: String
}
const map = new BMap.Map('allmap')    // 创建Map实例
class Map extends React.Component {
  props: Props
  constructor () {
    super()
    this.state = {
      cities: []
    }
    this.getAllCities = this.getAllCities.bind(this)
    this.showLocationInfo = this.showLocationInfo.bind(this)
    this.zoomCityMap = this.zoomCityMap.bind(this)
  }
  componentDidUpdate () {
    console.info(this.props)
  }
  componentDidMount () {
    this.getAllCities()
    // this.createMap()
  }
  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps.city, this.props.city)) {
      console.log(this.props)
      this.zoomCityMap(nextProps.city)
    }
  }
  getAllCities () {
    universalFetch(`${__TASK_URL__}projects/cities`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      // console.log(R.dropRepeats(json))
      if (json) {
        this.createMap(R.dropRepeats(json))
      }
    })
  }
  createMap (json) {
    const map = new BMap.Map('allmap')    // 创建Map实例
    this.setState({ map })
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5)  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl())   //添加地图类型控件
    map.setCurrentCity('北京')          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true)
    const that = this
    const bounds = map.getBounds()
    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()
    const lngSpan = Math.abs(sw.lng - ne.lng)
    const latSpan = Math.abs(ne.lat - sw.lat)
    const addMarker = (point) => {
      const marker = new BMap.Marker(point)
      map.addOverlay(marker)
    }
    const myGeo = new BMap.Geocoder()
    this.props.city && myGeo.getPoint(this.props.city, function (point) {
      if (point) {
        map.centerAndZoom(point, 15)
      }
    })
    for (let i = 0, len = json.length; i < len; i++) {
      myGeo.getPoint(json[i], function (point) {
        // console.info(point)
        if (point) {
          const lng = point.lng
          const lat = point.lat
          const points = new BMap.Point(lng, lat)
          const marker = new BMap.Marker(new BMap.Point(lng, lat))
          const gc = new BMap.Geocoder()
          addMarker(points)
          marker.addEventListener('click', function (e) {
            map.centerAndZoom(point, 15)
            that.props.push('/maps?city=1')
            gc.getLocation(e.point, function (rs) {
              that.showLocationInfo(json[i])
            })
          })
          map.addOverlay(marker)
        }
      })
    }
  }

  zoomCityMap (city) {
    const { map } = this.state
    if (!city) {
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 5)  // 初始化地图,设置中心点坐标和地图级别
      return
    }
    const myGeo = new BMap.Geocoder()
    myGeo.getPoint(city, function (point) {
      if (point) {
        map.centerAndZoom(point, 15)
      }
    })
  }
  showLocationInfo (value) {
    this.props.onClick(value)
  }
  render () {
    return (
      <div style={{ height: '100%' }} id='allmap' />
    )
  }
}

export default connect('', { push })(Map)
