// src/redux/actions.js
export const ADD_DATA = "ADD_DATA"
export const ADD_RESOURCE = "ADD_RESOURCE"

export const addData = (data) => ({
  type: ADD_DATA,
  payload: data,
})

export const addResource = (resource) => ({
  type: ADD_RESOURCE,
  payload: resource,
})
