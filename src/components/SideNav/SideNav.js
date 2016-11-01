// @flow
import React from 'react'
import { Menu, Icon } from 'antd'
import HeaderLogo from 'components/HeaderLogo'
import styles from './SideNav.css'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

type Props = {
}

export default class SideNav extends React.Component {
  props: Props

  state: {
    current: string
  }

  handleClick: (e: Object) => void

  constructor (props: Props) {
    super(props)

    this.state = { current: '-1' }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e: Object) {
    this.setState({ current: e.key })
  }

  render () {
    return (
      <div className={styles['side-nav']}>
        <div className={styles['header']}>
          <HeaderLogo />
        </div>
        <div className={styles['menu']}>
          <Menu onClick={this.handleClick}
            style={{ width: 240 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[this.state.current]}
            mode='inline'
          >
            <Menu.Item key='-1'>
              <Icon type='area-chart' />Option -1
            </Menu.Item>
            <Menu.Item key='0'>
              <Icon type='book' />Option 0
            </Menu.Item>
            <SubMenu key='sub1' title={<span><Icon type='mail' /><span>Navigation One</span></span>}>
              <MenuItemGroup title='Item 1'>
                <Menu.Item key='1'>Option 1</Menu.Item>
                <Menu.Item key='2'>Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title='Item 2'>
                <Menu.Item key='3'>Option 3</Menu.Item>
                <Menu.Item key='4'>Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key='sub2' title={<span><Icon type='appstore' /><span>Navigation Two</span></span>}>
              <Menu.Item key='5'>Option 5</Menu.Item>
              <Menu.Item key='6'>Option 6</Menu.Item>
              <SubMenu key='sub3' title='Submenu'>
                <Menu.Item key='7'>Option 7</Menu.Item>
                <Menu.Item key='8'>Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key='sub4' title={<span><Icon type='setting' /><span>Navigation Three</span></span>}>
              <Menu.Item key='9'>Option 9</Menu.Item>
              <Menu.Item key='10'>Option 10</Menu.Item>
              <Menu.Item key='11'>Option 11</Menu.Item>
              <Menu.Item key='12'>Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  }
}
