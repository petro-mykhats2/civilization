// src/redux/reducer.js
const initialState = {
  resources: [],
}

const resourceReducer = (state = initialState, action) => {
  console.log("Поточний стан:", state) // Додайте це для відстеження
  switch (action.type) {
    case "ADD_RESOURCE":
      return {
        ...state,
        resources: [...state.resources, action.payload],
      }
    case "REMOVE_RESOURCE": // Нова дія для видалення ресурсу
      return {
        ...state,
        resources: state.resources.filter(
          (resource) => resource.id !== action.payload
        ), // Видаляємо ресурс за id
      }
    default:
      return state
  }
}

export default resourceReducer
