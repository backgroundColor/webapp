import React from 'react'
import styles from './LeftPanel.css'
import { IndexLink, Link } from 'react-router'
import { Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { getCityData, fetchCityData } from 'store/CityMess/action'
import R from 'ramda'
const SubMenu = Menu.SubMenu

type Props = {
  cityMess: Object,
  getCityData: Function,
  fetchCityData: Function
}
class LeftPanel extends React.Component {
  props: Props
  state = {
    openKeys: [],
    current: '1',
    provinces: []
  }
  constructor (props) {
    super(props)
    this.onOpenChange = this.onOpenChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.props.fetchCityData()
    this.setState({
      provinces: this.props.cityMess
    })
  }
  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps, this.props)) {
      this.setState({
        provinces: nextProps.cityMess
      })
    }
  }
  handleClick (e) {
    console.log('Clicked: ', e)
    this.setState({ current: e.key })
  }

  onOpenChange (openKeys) {
    const state = this.state
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))

    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey)
    }
    this.setState({ openKeys: nextOpenKeys })
  }

  getAncestorKeys (key) {
    const map = {
      sub3: ['sub2']
    }
    return map[key] || []
  }

  render () {
    const { provinces = [] } = this.state
    return (
      <div className={styles['left-panel']}>
        <Menu
          mode='inline'
          efaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          theme='dark'
        >
          <SubMenu key='sub1' title={<span><Icon type='camera' /><span>实时监控</span></span>}>
            <Menu.Item key='1'>
              <IndexLink to='/maps'>全部</IndexLink>
            </Menu.Item>
            {
              provinces.map((item, index) => {
                return <SubMenu key={`menu${index}`} title={item.name}>
                  {
                    item.list && item.list.map((list, i) => {
                      return <Menu.Item key={`list${i}`}><Link to={`/maps?city=${list}`}>{list}</Link></Menu.Item>
                    })
                  }
                </SubMenu>
              })
            }
          </SubMenu>
          <SubMenu key='sub2' title={<span><Icon type='calendar' /><span>数据中心</span></span>}>
            <Menu.Item key='5'><Link to='runtime' activeClassName='active'>实时数据</Link></Menu.Item>
            <Menu.Item key='6'><Link to='history' activeClassName='active'>历史数据</Link></Menu.Item>
          </SubMenu>
          <SubMenu key='sub4' title={<span><Icon type='pushpin-o' /><span>报警记录</span></span>}>
            <Menu.Item key='9'><Link to='/warning' activeClassName='active'>记录</Link></Menu.Item>
          </SubMenu>
          <SubMenu key='sub5' title={<span><Icon type='setting' /><span>系统设置</span></span>}>
            <Menu.Item key='13'><Link to='/adduser' activeClassName='active'>添加用户</Link></Menu.Item>
            <Menu.Item key='14'><Link to='/modifyuser' activeClassName='active'>修改用户</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cityMess: state.cityMess.citymess
})
export default connect(mapStateToProps, { getCityData, fetchCityData })(LeftPanel)
