import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MaterialCombinationForm from "./MaterialCombinationForm"

const MaterialsContainer = () => {
  const [checked, setChecked] = useState(false)
  const resources = useSelector((state) => state.resources.resources) // Отримуємо ресурси з Redux
  const dispatch = useDispatch()

  const handleChange = () => {
    setChecked(!checked)
  }

  // Функція для обробки видалення ресурсу
  const handleRemoveResource = (id) => {
    dispatch({ type: "REMOVE_RESOURCE", payload: id }) // Відправка дії видалення ресурсу
  }

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="filters">
        <select>
          <option value="">Filter</option>
        </select>
      </div>

      <table>
        <thead>
          <tr className="thead">
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <tr key={resource.id}>
                <td className="container" onClick={handleChange}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                  />
                  <svg viewBox="0 0 64 64" height="14px" width="14px">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      className={`path ${checked ? "checked" : ""}`}
                    ></path>
                  </svg>
                  <span className="item_title">{resource.resourceName}</span>
                </td>
                <td>{resource.message}</td>
                <td>More Details</td>

                <td>
                  <button onClick={() => handleRemoveResource(resource.id)}>
                    Видалити
                  </button>
                </td>
                <td className="status-paid">Paid</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Немає доступних ресурсів.</td>
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
      <MaterialCombinationForm />
    </div>
  )
}

export default MaterialsContainer
