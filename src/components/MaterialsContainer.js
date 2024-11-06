import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MultipleSelect from "./MultipleSelect"

const MaterialsContainer = () => {
  const [filter, setFilter] = useState("всі")
  const resources = useSelector((state) => state.resources.resources)
  const technologies = useSelector((state) => state.resources.technologies)
  const tools = useSelector((state) => state.resources.tools)
  const workbenches = useSelector((state) => state.resources.workbenches)
  const dispatch = useDispatch()

  const handleRemoveResource = (id) => {
    dispatch({ type: "REMOVE_RESOURCE", payload: id })
  }

  const filteredItems = () => {
    switch (filter) {
      case "матеріали":
        return resources
      case "технології":
        return technologies.map((tech, index) => ({
          id: `tech-${index}`,
          resourceName: tech,
          type: "технологія",
        }))
      case "інструменти":
        return tools.map((tool, index) => ({
          id: `tool-${index}`,
          resourceName: tool,
          type: "інструмент",
        }))
      case "верстати":
        return workbenches.map((workbench, index) => ({
          id: `workbench-${index}`,
          resourceName: workbench,
          type: "верстат",
        }))
      default:
        return [
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
  }

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
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
