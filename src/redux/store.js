// redux/store.js
import { configureStore } from "@reduxjs/toolkit"
import resourceReducer from "./reducer"

const store = configureStore({
  reducer: {
    resources: resourceReducer, // Визначення редюсера для вашого стану
  },
})

export default store
