const initialState = {
  resources: [],
  technologies: [
    {
      id: 1,
      name: "Кручення",
      description: "Закручування матеріалу навколо осі для надання форми.",
      complexityLevel: 2,
      toolsRequired: [],
    },
    {
      id: 2,
      name: "Різання",
      description: "Розділення матеріалу на частини шляхом прикладення сили.",
      complexityLevel: 2,
      toolsRequired: ["Ніж", "Пила"],
    },
    {
      id: 3,
      name: "Забивання",
      description: "Вбивання одного матеріалу в інший для з'єднання.",
      complexityLevel: 1,
      toolsRequired: ["Молоток"],
    },
  ],
  tools: [
    {
      id: 1,
      name: "Молоток",
      description: "Забивання ",
      complexityLevel: 2,
    },
    {
      id: 2,
      name: "Сокира",
      description: "Розділення матеріалу на частини шляхом прикладення сили.",
      complexityLevel: 2,
    },
  ],
  workbenches: [
    {
      id: 1,
      name: "Деревообробгий верстат",
      description: "Розпил дерева",
      complexityLevel: 2,
    },
    {
      id: 2,
      name: "Верстат для формування цегли",
      description: "Формування цегли з глини",
      complexityLevel: 2,
    },
  ],
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
