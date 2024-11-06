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

  const handleRemoveResource = (id) => {
    dispatch({ type: "REMOVE_RESOURCE", payload: id })
  }

  const filteredItems = () => {
    let filtered = []

    switch (filter) {
      case "матеріали":
        filtered = resources
        break
      case "технології":
        filtered = technologies.map((tech, index) => ({
          id: `tech-${index}`,
          resourceName: tech,
          type: "технологія",
        }))
        break
      case "інструменти":
        filtered = tools.map((tool, index) => ({
          id: `tool-${index}`,
          resourceName: tool,
          type: "інструмент",
        }))
        break
      case "верстати":
        filtered = workbenches.map((workbench, index) => ({
          id: `workbench-${index}`,
          resourceName: workbench,
          type: "верстат",
        }))
        break
      default:
        filtered = [
          ...resources,
          ...technologies.map((tech, index) => ({
            id: `tech-${index}`,
            resourceName: tech,
            type: "технологія",
          })),
          ...tools.map((tool, index) => ({
            id: `tool-${index}`,
            resourceName: tool,
            type: "інструмент",
          })),
          ...workbenches.map((workbench, index) => ({
            id: `workbench-${index}`,
            resourceName: workbench,
            type: "верстат",
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Оновлюємо значення пошуку
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
              <tr key={item.id}>
                <td className="container">
                  <span className="item_title">{item.resourceName}</span>
                </td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => handleRemoveResource(item.id)}>
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
