import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import resourcePoints from "../data/coordinates.json"
import "../styles/mapWithResources.scss"
import { addResource } from "../redux/actions"
import ConfirmationModal from "./ConfirmationModal" // Імпортуйте модальне вікно

const MapWithResources = () => {
  const dispatch = useDispatch()
  const resources = useSelector((state) => state.resources.resources)
  console.log("uuyuyyuuyuy", resources)

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handlePointClick = (point) => {
    if (point.id >= 1 && point.id <= 5) {
      setSelectedPoint(point)
      setIsModalOpen(true)
    }
  }

  const confirmResearch = () => {
    if (selectedPoint) {
      // Перевірка на наявність вже дослідженої області
      const isAlreadyResearched = resources.some(
        (resource) => resource.id === selectedPoint.id
      )

      if (isAlreadyResearched) {
        alert(`Область з ID ${selectedPoint.id} вже досліджена!`)
        return // Виходимо з функції, щоб не додавати ресурс
      }

      // Додаємо новий ресурс, якщо його ще не було
      dispatch(addResource(selectedPoint))
      setIsModalOpen(false)
    }
  }

  const cancelResearch = () => {
    setIsModalOpen(false)
  }

  const scale = Math.min(
    windowDimensions.width / 1024,
    windowDimensions.height / 1024
  )

  return (
    <div className="map-container">
      <img
        src="./mapa.png"
        alt="Map"
        className="map-image"
        style={{
          width: `${1024 * scale}px`,
          height: `${1024 * scale}px`,
        }}
      />
      <div className="resource-layer">
        {resourcePoints.map((point) => (
          <div
            key={point.id}
            className={`resource-point ${
              point.id >= 1 && point.id <= 5 ? "active" : "inactive"
            }`}
            style={{
              left: `${(point.x / 1024) * 1000 * scale}px`,
              top: `${(point.y / 1024) * 1000 * scale}px`,
              backgroundColor: resources.some(
                (resource) => resource.id === point.id
              )
                ? "blue" // Змінюємо колір на синій, якщо ресурс вже досліджений
                : "",
            }}
            onClick={() => handlePointClick(point)}
          >
            {point.id}
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelResearch}
        onConfirm={confirmResearch}
        resourceId={selectedPoint ? selectedPoint.id : null}
      />
    </div>
  )
}

export default MapWithResources
