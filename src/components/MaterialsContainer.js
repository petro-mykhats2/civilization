import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MultipleSelect from "./MultipleSelect"

const MaterialsContainer = () => {
  const [filter, setFilter] = useState("всі")
  const [searchQuery, setSearchQuery] = useState("") // Стан для пошукового запиту
  const resources = useSelector((state) => state.resources.resources)
  const technologies = useSelector((state) => state.resources.technologies)
  const tools = useSelector((state) => state.resources.tools)
  const workbenches = useSelector((state) => state.resources.workbenches)
  const dispatch = useDispatch()

  // Оновлена функція видалення для різних категорій
  const handleRemoveResource = (id, type) => {
    console.log("Attempting to remove:", { id, type })
    switch (type) {
      case "матеріал":
        dispatch({ type: "DELETE_MATERIAL", payload: id })
        break
      case "технологія":
        dispatch({ type: "DELETE_TECHNOLOGY", payload: id })
        break
      case "інструмент":
        dispatch({ type: "DELETE_TOOL", payload: id })
        break
      case "верстат":
        dispatch({ type: "DELETE_WORKBENCH", payload: id })
        break
      default:
        console.error("Категорія для видалення не знайдена.")
    }
  }

  const filteredItems = () => {
    let filtered = []

    switch (filter) {
      case "матеріали":
        filtered = resources
        break
      case "технології":
        filtered = technologies.map((tech) => ({
          id: tech.id,
          resourceName: tech.name,
          type: tech.type || "технологія", // додавання захисту
        }))
        break
      case "інструменти":
        filtered = tools.map((tool) => ({
          id: tool.id,
          resourceName: tool.name,
          type: tool.type || "інструмент", // додавання захисту
        }))
        break
      case "верстати":
        filtered = workbenches.map((workbench) => ({
          id: workbench.id,
          resourceName: workbench.name,
          type: workbench.type || "верстат", // додавання захисту
        }))
        break
      default:
        filtered = [
          ...resources,
          ...technologies.map((tech) => ({
            id: tech.id,
            resourceName: tech.name,
            type: tech.type || "технологія", // додавання захисту
          })),
          ...tools.map((tool) => ({
            id: tool.id,
            resourceName: tool.name,
            type: tool.type || "інструмент", // додавання захисту
          })),
          ...workbenches.map((workbench) => ({
            id: workbench.id,
            resourceName: workbench.name,
            type: workbench.type || "верстат", // додавання захисту
          })),
        ]
    }

    // Фільтруємо за пошуковим запитом
    return filtered.filter((item) =>
      item.resourceName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="App">
      <div className="search-filter-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="всі">Всі категорії</option>
            <option value="матеріали">Матеріали</option>
            <option value="технології">Технології</option>
            <option value="інструменти">Інструменти</option>
            <option value="верстати">Верстати</option>
          </select>
        </div>
      </div>

      <MultipleSelect />

      <table>
        <thead>
          <tr className="thead">
            <th>Назва</th>
            <th>Тип</th>
            <th>Дія</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {filteredItems().length > 0 ? (
            filteredItems().map((item) => (
              // Combine id and type to ensure unique keys
              <tr key={`${item.id}-${item.type}`}>
                <td className="container">
                  <span className="item_title">{item.resourceName}</span>
                </td>
                <td>{item.type}</td>
                <td>
                  <button
                    onClick={() => handleRemoveResource(item.id, item.type)}
                  >
                    Видалити
                  </button>
                </td>
                <td className="status-paid">Paid</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Немає доступних елементів.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => console.log("Go to previous")}>
          &laquo; Previous
        </button>
        <button onClick={() => console.log("Go to next")}>Next &raquo;</button>
      </div>
    </div>
  )
}

export default MaterialsContainer
