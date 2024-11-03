import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import resourcePoints from "../data/coordinates.json"
import "../styles/mapWithResources.scss"
import { addResource } from "../redux/actions"
import ConfirmationModal from "./ConfirmationModal" // Імпортуйте модальне вікно

const MapWithResources = () => {
  const dispatch = useDispatch()
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [isModalOpen, setIsModalOpen] = useState(false) // Стейт для контролю видимості модального вікна
  const [selectedPoint, setSelectedPoint] = useState(null) // Стейт для вибраного ресурсу

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
    setSelectedPoint(point)
    setIsModalOpen(true)
  }

  const confirmResearch = () => {
    if (selectedPoint) {
      dispatch(addResource(selectedPoint)) // Додайте ресурс
      setIsModalOpen(false) // Закрийте модальне вікно
    }
  }

  const cancelResearch = () => {
    setIsModalOpen(false) // Закрийте модальне вікно без дії
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
            className="resource-point"
            style={{
              left: `${(point.x / 1024) * 1000 * scale}px`,
              top: `${(point.y / 1024) * 1000 * scale}px`,
            }}
            onClick={() => handlePointClick(point)}
          >
            {point.id}
          </div>
        ))}
      </div>

      {/* Додайте компонент модального вікна */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelResearch}
        onConfirm={confirmResearch}
        resourceId={selectedPoint ? selectedPoint.id : null} // Передайте ID ресурсу
      />
    </div>
  )
}

export default MapWithResources
