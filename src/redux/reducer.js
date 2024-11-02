// reducer.js
import { ADD_DATA, ADD_RESOURCE } from "./actions"

const initialState = {
  data: [], // Місце для збереження даних
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, action.payload], // Додавання даних
      }
    default:
      return state
  }
}

export default dataReducer
