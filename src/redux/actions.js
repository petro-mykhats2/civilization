// redux/actions.js
export const ADD_RESOURCE = "ADD_RESOURCE"

export const addResource = (resource) => ({
  type: ADD_RESOURCE,
  payload: resource,
})
