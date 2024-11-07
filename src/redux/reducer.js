const initialState = {
  resources: [],
  technologies: [
    "Технологія 1",
    "Технологія 2",
    "Технологія 3",
    "Технологія 4",
    "Технологія 5",
    "Технологія 6",
  ],
  tools: ["Інструмент 1", "Інструмент 2", "Інструмент 3", "Інструмент 4"],
  workbenches: ["Верстат 1", "Верстат 2"],
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
      return {
        ...state,
        resources: state.resources.filter(
          (resource) => resource.id !== action.payload
        ),
      }
    case "DELETE_TECHNOLOGY":
      return {
        ...state,
        technologies: state.technologies.filter(
          (_, index) => `tech-${index}` !== action.payload
        ),
      }
    case "DELETE_TOOL":
      return {
        ...state,
        tools: state.tools.filter(
          (_, index) => `tool-${index}` !== action.payload
        ),
      }
    case "DELETE_WORKBENCH":
      return {
        ...state,
        workbenches: state.workbenches.filter(
          (_, index) => `workbench-${index}` !== action.payload
        ),
      }
    default:
      return state
  }
}

export default resourceReducer
