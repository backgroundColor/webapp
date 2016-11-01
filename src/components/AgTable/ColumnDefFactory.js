export default class ColumnDefFactory {
  createColDefs (props) {
    let colsHeader = [{
      headerName: '序号', width: 40, cellRenderer: function (params) {
        return params.node.id + 1
      }, suppressSizeToFit: true, suppressSorting: true, suppressMenu: true, cellStyle: { padding: '8px' }
    }]
    if (props) {
      props.map(col => {
        colsHeader.push(col)
      })
      return colsHeader
    }
  }
}
