// src/redux/reducer.js
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
  console.log("Поточний стан:", state) // Додайте це для відстеження
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
    case "REMOVE_RESOURCE":
      return {
        ...state,
        resources: state.resources.filter(
          (resource) => resource.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default resourceReducer
