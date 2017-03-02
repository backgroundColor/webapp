import { universalFetch } from 'modules/fetch'
import { notification } from 'antd'
export const GET_CITY_DATA = 'GET_CITY_DATA'

export function getCityData (value) {
  return {
    type: GET_CITY_DATA,
    value
  }
}

export function fetchStatusHandler (response) {
  if (response.status === 200) {
    return response
  } else {
    throw new Error(response.status)
  }
}

export const fetchCityData = () => {
  return (dispatch, getState) => {
    const url = `${__TASK_URL__}projects/provinces`
    return universalFetch(url)
    .then(fetchStatusHandler)
    .then((res) => res.json())
    .then((json) => {
      if (json) {
        let newList = []
        const promises = json.map((id) =>
          universalFetch(`${__TASK_URL__}projects/cities?province=${id}`)
          .then(resp => resp.json())
          .then((json) => {
            // console.log(json)
            return { name: id, list: json }
          })
        )

        Promise.all(promises).then((post) => {
          newList = post.map((json) => json)
          // console.log(newList)
          dispatch(getCityData(newList))
        })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: '获取数据失败！！'
      })
    })
  }
}
