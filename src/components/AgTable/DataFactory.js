import biu from 'biu.js'
export default class DataFactory {
  createDatasource (path, pagesize, callback) {
    console.log('agtable data ajax run this...........')
    let datasource = {
      pageSize: pagesize,
      getRows: function (params) {
        const URL = `${__TASK_URL__}${path}?size=${pagesize}&page=${params.endRow / pagesize}`
        fetch(URL)
        .then(function (response) {
          if (response.status !== 200) {
            console.error('error')
            return
          }
          return response.json()
        })
        .then(function (json) {
          if (json) {
            return json.body
          }
        })
        .then(function (data) {
          if (data) {
            console.log('asking for ' + params.startRow + ' to ' + params.endRow)
            const rowsThisPage = data.items
            let lastRow = -1
            lastRow = data.pageInfo.total
            callback(data.pageInfo.total, data.pageInfo.pages)
            document.querySelector('#current').onfocus = (e) => {
              const currentVal = e.target.value
              const reg = /^\+?[1-9][0-9]*$/
              e.target.onblur = (e) => {
                if (!reg.test(e.target.value)) {
                  e.target.value = currentVal
                }
              }
            }
            params.successCallback(rowsThisPage, lastRow)
          }
        })
        .catch(function (err) {
          console.error(err)
          biu('访问失败，请稍后再试！！', {
            type: 'danger',
            autoHide: true,
            timeout: 3000
          })
          params.failCallback()
        })
      }
    }

    return datasource
  }
}
