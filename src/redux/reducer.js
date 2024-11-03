// src/redux/reducer.js
const initialState = {
  resources: [], // Переконайтеся, що тут масив
}

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RESOURCE":
      return {
        ...state,
        resources: [...state.resources, action.payload], // Додає ресурс до масиву
      }
    // Додайте інші дії, якщо потрібно
    default:
      return state
  }
}

export default resourceReducer
