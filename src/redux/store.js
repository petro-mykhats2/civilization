// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // Використовуємо localStorage для збереження
import resourceReducer from "./reducer"

// Налаштування persist
const persistConfig = {
  key: "root",
  storage,
}

// Створення persist-редюсера
const persistedReducer = persistReducer(persistConfig, resourceReducer)

// Створення store з використанням persist-редюсера
const store = configureStore({
  reducer: {
    resources: persistedReducer, // Додаємо persist-редюсер
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Виключаємо перевірку серіалізованості для підтримки `redux-persist`
    }),
})

const persistor = persistStore(store)

export { store, persistor }
