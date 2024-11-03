// ResourceList.js
import React from "react"
import { useSelector } from "react-redux"

const ResourceList = () => {
  const resources = useSelector((state) => state.resources) // Припускаємо, що resources — це масив

  return (
    <div style={{ color: "red", marginRight: "0" }}>
      <h2>Досліджені ресурси:</h2>
      {resources.length > 0 ? ( // Перевіряємо, чи є ресурси
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>{resource.message}</li>
          ))}
        </ul>
      ) : (
        <p>Немає доступних ресурсів.</p> // Повідомлення, якщо немає даних
      )}
    </div>
  )
}

export default ResourceList
