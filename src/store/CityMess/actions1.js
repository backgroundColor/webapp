import { universalFetch } from 'modules/fetch'
import { timeout } from 'store/utils/timeout'
import { pathRebuild } from 'store/utils/apiURL'
import { FIELD_GROUP } from 'store/modules/overview/actions'
export const REQUEST_TAGSVIEW = 'REQUEST_TAGSVIEW'
export const RECEIVE_TAGSVIEW = 'RECEIVE_TAGSVIEW'

export const SELECTED_TYPE = 'SELECTED_TYPE'
export const UPDATE_TAG_FILTER_TEXT = 'UPDATE_TAG_FILTER_TEXT'

export const INVALIDATE_TAGSVIEW = 'INVALIDATE_TAGSVIEW'
export function invalidateTags (selectedType, message) {
  return {
    type: INVALIDATE_TAGSVIEW,
    selectedType,
    message
  }
}

export function selectType (selectedType) {
  return {
    type: SELECTED_TYPE,
    selectedType
  }
}
export function updateText (filterText) {
  return {
    type: UPDATE_TAG_FILTER_TEXT,
    filterText
  }
}
export function requestTagsview (selectedType) {
  return {
    type: REQUEST_TAGSVIEW,
    selectedType
  }
}
export function receiveTagsviesw (selectedType, json) {
  return {
    type: RECEIVE_TAGSVIEW,
    selectedType,
    data: json
  }
}
//
export function shouldFetchTagsview (state, selectedType) {
  const { data, isFetching } = state.tags[selectedType] || {}
  if (!data) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchStatusHandler (response) {
  if (response.status === 200) {
    return response
  } else {
    throw new Error(response.status)
  }
}

export function fetchTagsView (selectedType) {
  return (dispatch, getState) => {
    dispatch(requestTagsview(selectedType))
    const baseURL = __SDM_URL__
    // const options = { headers: { } }

    const category = selectedType === FIELD_GROUP
      ? 'field-groups' : 'assets'

    return timeout(
      universalFetch(pathRebuild(baseURL, `console/tags/${category}`)), __REQ_TIMEOUT__)
    .then(fetchStatusHandler)
    .then((req) => req.json())
    .then((json) => {
      if (json.code === 0) {
        dispatch(receiveTagsviesw(selectedType, json.tags))
      } else {
        dispatch(invalidateTags(selectedType, json.message))
      }
    })
    .catch((error) => {
      dispatch(invalidateTags(selectedType, error.message))
    })
  }
}

export function fetchTagsViewIfNeeded (selectedType) {
  return (dispatch, getState) => {
    if (shouldFetchTagsview(getState(), selectedType)) {
      return dispatch(fetchTagsView(selectedType))
    }
  }
}
