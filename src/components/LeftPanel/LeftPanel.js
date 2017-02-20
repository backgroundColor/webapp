import React from 'react'
import styles from './LeftPanel.css'
import { IndexLink, Link } from 'react-router'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
export default class LeftPanel extends React.Component {
  state = {
    openKeys: [],
    current: '1',
    provinces: []
  }
  constructor () {
    super()
    this.onOpenChange = this.onOpenChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getMenu = this.getMenu.bind(this)
  }

  componentDidMount () {
    this.getMenu()
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

  getMenu () {
    const url = `${__TASK_URL__}projects/provinces`
    fetch(url)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json) {
        let newList = []
        const promises = json.map((id) =>
          fetch(`${__TASK_URL__}projects/cities?province=${id}`)
          .then(resp => resp.json())
          .then((json) => {
            return { name: id, list: json }
          })
        )

        Promise.all(promises).then((post) => {
          newList = post.map((json) => json)
          // console.log(newList)
          this.setState({
            provinces: newList
          })
        })
        // json.forEach((item) => {
        //   let listJson = { name: '', cities: [] }
        //   listJson.name = item
        //   const citiesUrl = `${__TASK_URL__}projects/cities?province=${item}`
        //   fetch(citiesUrl)
        //   .then((res) => res.status === 200 && res.json())
        //   .then((data) => {
        //     listJson.cities = data.map((item) => item)
        //   })
        //   newList.push(listJson)
        // })
        // this.setState({
        //   provinces: newList
        // })
      }
    })
    .catch((err) => {
      console.info('err!!')
      console.error(err)
    })
  }

  render () {
    const { provinces = [] } = this.state
    return (
      <div className={styles['left-panel']}>
        <div className={styles['left-panel-logo']}>
          logo
        </div>
        <Menu
          mode='inline'
          efaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          theme='dark'
        >
          <SubMenu key='sub1' title={<span><Icon type='camera' /><span>实时监控</span></span>}>
            <Menu.Item key='1'>
              <Link to='/maps'>全部</Link>
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
            <Menu.Item key='5'><Link to='runtime'>实时数据</Link></Menu.Item>
            <Menu.Item key='6'><Link to='history'>历史数据</Link></Menu.Item>
          </SubMenu>
          <SubMenu key='sub4' title={<span><Icon type='pushpin-o' /><span>报警记录</span></span>}>
            <Menu.Item key='9'><Link to='/warning'>记录</Link></Menu.Item>
          </SubMenu>
          <SubMenu key='sub5' title={<span><Icon type='setting' /><span>系统设置</span></span>}>
            <Menu.Item key='13'><Link to='/adduser'>添加用户</Link></Menu.Item>
            <Menu.Item key='14'><Link to='/modifyuser'>修改用户</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
