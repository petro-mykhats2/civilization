import React, { useState } from "react"
import "../Technologies.css" // Не забудьте створити файл CSS і підключити його

const Technologies = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
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
          <tr>
            <td className="container" onClick={handleChange}>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              <svg viewBox="0 0 64 64" height="14px" width="14px">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  className={`path ${checked ? "checked" : ""}`} // Додаємо клас при виборі
                ></path>
              </svg>
              <span className="item_title">Item 1</span>
            </td>
            <td>Details</td>
            <td>More Details</td>
            <td>More Details</td>
            <td className="status-paid">Paid</td>
          </tr>
        </tbody>
      </table>

      <div className="pagination">
        <a href="#">&laquo; Previous</a>
        <a href="#">Next &raquo;</a>
      </div>
    </div>
  )
}

export default Technologies
