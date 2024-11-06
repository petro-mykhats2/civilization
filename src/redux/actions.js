// redux/actions.js
export const ADD_RESOURCE = "ADD_RESOURCE"
export const ADD_ITEM = "ADD_ITEM"
export const ADD_TECHNOLOGY = "ADD_TECHNOLOGY"
export const ADD_TOOL = "ADD_TOOL"
export const ADD_WORKBENCH = "ADD_WORKBENCH"

export const addResource = (resource) => ({
  type: ADD_RESOURCE,
  payload: resource,
})

export const addItem = (item) => ({
  type: "ADD_ITEM",
  payload: item,
})

export const addTechnology = (technology) => ({
  type: ADD_TECHNOLOGY,
  payload: technology,
})

export const addTool = (tool) => ({
  type: ADD_TOOL,
  payload: tool,
})

export const addWorkbench = (workbench) => ({
  type: ADD_WORKBENCH,
  payload: workbench,
})
