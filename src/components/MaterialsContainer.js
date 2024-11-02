import React, { useEffect, useState } from "react"
import AddMaterialForm from "./AddMaterialForm"

const MaterialsContainer = () => {
  const [materials, setMaterials] = useState([])

  //   const materials = JSON.parse(localStorage.getItem("materials"))
  console.log(JSON.parse(localStorage.getItem("materials")))

  useEffect(() => {
    const storedMaterials = localStorage.getItem("materials")
    if (storedMaterials) {
      setMaterials(JSON.parse(storedMaterials))
    }
  }, [])

  const handleAddMaterial = (newMaterial) => {
    setMaterials((prevMaterials) => {
      const updatedMaterials = [
        ...prevMaterials,
        { id: Date.now(), ...newMaterial },
      ]
      localStorage.setItem("materials", JSON.stringify(updatedMaterials))
      return updatedMaterials
    })
  }

  const handleDeleteMaterial = (id) => {
    setMaterials((prevMaterials) => {
      const updatedMaterials = prevMaterials.filter(
        (material) => material.id !== id
      )
      localStorage.setItem("materials", JSON.stringify(updatedMaterials))
      return updatedMaterials
    })
  }

  return (
    <div>
      <AddMaterialForm onAdd={handleAddMaterial} materials={materials} />
      <h2>Матеріали</h2>
      <ul className="materials-list">
        {materials.map((material) => (
          <li key={material.id}>
            <strong>{material.name}</strong> - {material.properties.join(", ")}
            <button onClick={() => handleDeleteMaterial(material.id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MaterialsContainer
