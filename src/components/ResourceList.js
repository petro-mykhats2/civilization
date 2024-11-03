import React from "react"
import { useSelector, useDispatch } from "react-redux"

const ResourceList = () => {
  const resources = useSelector((state) => state.resources.resources)
  const dispatch = useDispatch()

  // Функція для обробки видалення ресурсу
  const handleRemoveResource = (id) => {
    dispatch({ type: "REMOVE_RESOURCE", payload: id }) // Відправка дії видалення ресурсу
  }

  return (
    <div style={{ color: "red", marginRight: "0" }}>
      <h2>Досліджені ресурси:</h2>
      {resources.length > 0 ? (
        <ul>
          {resources.map((resource, index) => (
            <li key={index}>
              {resource.message}
              <button onClick={() => handleRemoveResource(resource.id)}>
                Видалити
              </button>{" "}
              {/* Кнопка видалення */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Немає доступних ресурсів.</p>
      )}
    </div>
  )
}

export default ResourceList
