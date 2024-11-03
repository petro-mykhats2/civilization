// ResourceList.js
import React from "react"
import { useSelector } from "react-redux"

const ResourceList = () => {
  const resources = useSelector((state) => state.resources) // Припускаємо, що resources — це масив

  // Перевірка на наявність та валідність даних
  if (!resources || !Array.isArray(resources)) {
    return <p>Немає доступних ресурсів.</p> // Відображаємо повідомлення, якщо дані відсутні
  }

  return (
    <div style={{ color: "red", marginRight: "0" }}>
      <h2>Досліджені ресурси:</h2>
      {resources.length > 0 ? (
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>{resource.message}</li>
          ))}
        </ul>
      ) : (
        <p>Немає доступних ресурсів.</p> // Повідомлення, якщо масив порожній
      )}
    </div>
  )
}

export default ResourceList
