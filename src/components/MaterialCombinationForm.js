import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import combinations from "../data/combinations" // Імпортуємо масив комбінацій
import { addItem } from "../redux/actions" // Додайте ваш action для Redux

const MaterialCombinationForm = () => {
  const dispatch = useDispatch()
  const [materials, setMaterials] = useState([{ name: "" }])
  const [technology, setTechnology] = useState("")
  const [message, setMessage] = useState("")

  const availableMaterials = useSelector((state) => state.resources.resources) // Доступні матеріали з Redux
  const availableTechnologies = ["Технологія 1", "Технологія 2"] // Додайте свої технології

  const handleMaterialChange = (index, value) => {
    const newMaterials = [...materials]
    newMaterials[index].name = value
    setMaterials(newMaterials)
  }

  const addMaterialField = () => {
    setMaterials([...materials, { name: "" }])
  }

  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000) // Генерація унікального ID
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedMaterials = materials.map((m) => m.name).filter(Boolean)
    const combination = combinations.find((combo) =>
      combo.materials.every((mat) => selectedMaterials.includes(mat))
    )

    if (combination) {
      const newItem = {
        id: generateUniqueId(), // Виклик функції для генерації унікального ID
        message: "інструмент", // Ваше повідомлення
        resourceName: combination.result, // Назва нового ресурсу
      }
      dispatch(addItem(newItem)) // Додайте новий елемент до Redux
      setMessage(`Успіх! Створено: ${combination.result}`)
    } else {
      setMessage("Комбінація неможлива.")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {materials.map((material, index) => (
          <select
            key={index}
            value={material.name}
            onChange={(e) => handleMaterialChange(index, e.target.value)}
          >
            <option value="">Оберіть матеріал</option>
            {availableMaterials.map((m) => (
              <option key={m.id} value={m.resourceName}>
                {m.resourceName}
              </option>
            ))}
          </select>
        ))}
        <button type="button" onClick={addMaterialField}>
          Додати матеріал
        </button>

        <select
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        >
          <option value="">Оберіть технологію</option>
          {availableTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>

        <button type="submit">Створити</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default MaterialCombinationForm
