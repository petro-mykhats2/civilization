import React from "react"
import ReactDOM from "react-dom/client" // Зміна імпорту
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import resourceReducer from "./redux/reducer" // ваш редюсер
import App from "./App"

// Створення store
const store = configureStore({
  reducer: resourceReducer,
})

// Створення кореня рендерингу
const root = ReactDOM.createRoot(document.getElementById("root"))

// Виклик рендерингу
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
