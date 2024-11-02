// store.js
import { configureStore } from "@reduxjs/toolkit"
import dataReducer from "./reducer" // Імпортуйте редуктор

const store = configureStore({
  reducer: {
    data: dataReducer, // Додайте редуктор до конфігурації магазину
  },
})

export default store
ф
