// redux/actions.js
export const ADD_RESOURCE = "ADD_RESOURCE"
export const ADD_ITEM = "ADD_ITEM"

export const addResource = (resource) => ({
  type: ADD_RESOURCE,
  payload: resource,
})

// actions.js
export const addItem = (item) => ({
  type: "ADD_ITEM",
  payload: item,
})
