// ResourceList.js
import React from "react"
import { useSelector } from "react-redux"

const ResourceList = () => {
  const resources = useSelector((state) => state.resources)

  return (
    <div style={{ color: "red", marginRight: "0" }}>
      <h2>Досліджені ресурси:</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>{resource.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default ResourceList
