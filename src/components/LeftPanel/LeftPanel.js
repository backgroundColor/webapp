import React from 'react'
import styles from './LeftPanel.css'
import { IndexLink, Link } from 'react-router'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
export default class LeftPanel extends React.Component {
  state = {
    openKeys: [],
    current: '1'
  }
  constructor () {
    super()
    this.onOpenChange = this.onOpenChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
     console.log('Clicked: ', e)
     this.setState({ current: e.key })
   }

   onOpenChange(openKeys) {
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

   getAncestorKeys(key) {
     const map = {
       sub3: ['sub2'],
     };
     return map[key] || [];
   }

  render () {
    return (
      <div className={styles['left-panel']}>
        <div className={styles['left-panel-logo']}>
          logo
        </div>
        <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{ width: 220 }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
        theme='dark'
        >
          <SubMenu key="sub1" title={<span><Icon type="camera" /><span>实时监控</span></span>}>
            <Menu.Item key="1">
              <Link to='/maps'>map</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="calendar" /><span>数据中心</span></span>}>
            <Menu.Item key="5">实时数据</Menu.Item>
            <Menu.Item key="6">历史数据</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="pushpin-o" /><span>报警记录</span></span>}>
            <Menu.Item key="9">记录</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
            <Menu.Item key="13"><Link to='/adduser'>添加用户</Link></Menu.Item>
            <Menu.Item key="14"><Link to='/modifyuser'>修改用户</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
