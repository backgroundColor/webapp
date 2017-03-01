// @flow
/**
 * 在这里处理response status code
 */
import fetch from 'isomorphic-fetch'
import { notification } from 'antd'
import update from 'react-addons-update'
import R from 'ramda'
// import storage from 'store/utils/crossStorageClient'
// import { UnAuthedException } from './UnAuthedException'

type Params = {
  path: string,
  options: Object
}

type Store = {
  dispatch: () => void,
  getState: () => Object
}

const redirectConf = (path: string = '', params) => {
  if (path.indexOf('pas/services') > 0) {
    return update(params, {
      options: {
        redirect: { '$set': 'manual' }
      }
    })
  }
  return params
}

const authConf = (path: string = '', authApi: boolean, params) => {
  if (authApi && path.indexOf('tub/v1') > 0) {
    return update(params, {
      options: {
        credentials: { '$set': 'include' }
      }
    })
  }
  return params
}

function setOptions (params: Params, store?: Store) {
  // const { user: { accessKey } } = store.getState()
  // const dispatch = store.dispatch
  //
  // return new Promise((resolve, reject) => {
  //   if (accessKey) {
  //     resolve(accessKey)
  //     return
  //   }
  //
  //   storage.onConnect()
  //     .then(() => storage.get('user'))
  //     .then((json) => {
  //       const user = JSON.parse(json)
  //       dispatch(loadUser(user))
  //       resolve(user.accessKey)
  //     })
  //     .catch(() => {
  //       resolve('')
  //     })
  // }).then((token) => {
  //   const newParams = Object.assign({}, params)
  //   if (!newParams.options.headers) {
  //     newParams.options.headers = { 'Kmx-Access-Key': accessKey }
  //   } else {
  //     newParams.options.headers['Kmx-Access-Key'] = accessKey
  //   }
  //
  //   return newParams
  // })
  // const { path } = params
  // const paramsConf = R.compose(redirectConf.bind(this, path), authConf.bind(this, path, __AUTH_API__))(params)
  return Promise.resolve(params)
}

function handleFetch ({path, options}: Params) {
  return fetch(path, options)
}

export function handleFetchError (e: Error, title: string = '请求异常') {
  console.error(e)
  notification['error']({
    message: title,
    description: (e && e.message) ? e.message : e
  })
}

function isResError ({ status }: Object) {
  return status >= 400
}

function handleResponseStatus (response) {
  // if (response.status === 302) {
  //   um.actions.clearUser()
  //   window.location.href = `${__PORTAL_URL__}login?url=${window.location.href}`
  //   throw new UnAuthedException()
  // }
  // if (!(response.status >= 200 && response.status < 300) || response.status === 304) {
  //   console.log(response.status)
  //   // return
  // }
  console.log('response status:', response.status)
  if (isResError(response)) {
    // TODO: handle http error
  }

  return response
}

export function universalFetch (path: string, options: Object = {}, store?: Store) {
  const params = { path, options }

  return setOptions(params, store)
    .then(handleFetch)
    .then(handleResponseStatus)
}

export default universalFetch
