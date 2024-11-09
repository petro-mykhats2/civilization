import technologies from "../data/technologies.json"
const initialState = {
  resources: [],
  technologies: technologies,
  tools: [],
  workbenches: [],
}

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RESOURCE":
      return {
        ...state,
        resources: [...state.resources, action.payload],
      }
    case "ADD_ITEM":
      return {
        ...state,
        resources: [...state.resources, action.payload],
      }
    case "ADD_TECHNOLOGY":
      return {
        ...state,
        technologies: [...state.technologies, action.payload],
      }
    case "ADD_TOOL":
      return {
        ...state,
        tools: [...state.tools, action.payload],
      }
    case "ADD_WORKBENCH":
      return {
        ...state,
        workbenches: [...state.workbenches, action.payload],
      }
    case "REMOVE_RESOURCE":
      return {
        ...state,
        resources: state.resources.filter(
          (resource) => resource.id !== action.payload
        ),
      }
    case "DELETE_MATERIAL":
      console.log("Before removing:", state.resources)
      const updatedResources = state.resources.filter(
        (item) => item.id !== action.payload
      )
      console.log("After removing:", updatedResources)
      return {
        ...state,
        resources: updatedResources,
      }

    case "DELETE_TECHNOLOGY":
      return {
        ...state,
        technologies: state.technologies.filter(
          (tech) => tech.id !== action.payload
        ),
      }
    case "DELETE_TOOL":
      return {
        ...state,
        tools: state.tools.filter((tool) => tool.id !== action.payload),
      }
    case "DELETE_WORKBENCH":
      return {
        ...state,
        workbenches: state.workbenches.filter(
          (workbench) => workbench.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default resourceReducer
