import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import ColumnDefFactory from './ColumnDefFactory'
import DataFactory from './DataFactory'
import PageNumChange from './PageNumChange'
import TopChangeNum from './TopChangePage'

type Props = {
  path: String,
  cols: Array,
  type: String
}
export default class AgTable extends React.Component {
  props: Props;
  state = {
    colDefs: new ColumnDefFactory().createColDefs(this.props.cols),
    total: '1000',
    pagesize: 1,
    totalpage: ''
  }
  constructor (props) {
    super(props)
    this.gridOptions = {
      columnDefs: this.state.colDefs,
      onModelUpdated: (params) => {
        console.log('event onModelUpdated received')
        if (this.api) {
          this.api.sizeColumnsToFit()
        }
      },
      // onSelectionChanged: () => { this.onSelectionChanged() },
      onGridReady: (params) => { this.onGridReady(params) },
      rowSelection: 'single',
      rowModelType: 'pagination',
      rowStyle: { 'font-size': '12px' },
      localeText: {
        page: '',
        more: '...',
        to: '',
        of: '/',
        next: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        last: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
        first: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
        previous: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        loadingOoo: '数据加载中...',
        noRowsToShow: '暂无数据'
      }
    }
    this.pageNumChange = this.pageNumChange.bind(this)
    this.getTotal = this.getTotal.bind(this)
  }

  onGridReady (params) {
    this.api = params.api
    this.columnApi = params.columnApi
    this.getTableData(this.state.pagesize)
    this.onContainerResize(() => { this.api.sizeColumnsToFit() })
  }

  onContainerResize (callback) {
    const center = document.querySelector('#center')
    const MutationObserver = window.MutationObserver || window.WebkitMutationObserver ||
      window.MozMutationObserver
    let observer = new MutationObserver(function (mutations) {
      callback()
    })
    const config = { attributes: true, childList: true, characterData: true }
    observer.observe(center, config) // 监听ag-grid内部的center，响应时间最短，不用设置setTimtout
  }

  getTableData (pagesize) {
    this.api.setColumnDefs(new ColumnDefFactory().createColDefs(this.props.cols))
    this.api.setDatasource(new DataFactory().createDatasource(this.props.type, pagesize, this.getTotal))
  }

  getTotal (total, totalpage) {
    this.setState({
      total,
      totalpage
    })
  }

  pageNumChange (e) {
    this.setState({
      pagesize: e.target.value
    })
    this.getTableData(e.target.value)
  }

  render () {
    return (
      <div style={{ height: '90%' }} className='ag-fresh ag-container'>
        <TopChangeNum total={this.state.totalpage} />
        <AgGridReact
          gridOptions={this.gridOptions}
          columnDefs={this.state.columnDefs}
          enableColResize='true'
          enableSorting='true'
          rowHeight='34'
          headerHeight='28'
          rowBuffer='50'
          debug='false'
        />
        <PageNumChange
          total={this.state.total}
          pagesize={this.state.pagesize}
          options={[10, 25, 50]}
          onChange={this.pageNumChange} />
      </div>
    )
  }
}
