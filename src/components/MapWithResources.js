import React, { useEffect, useState } from "react"
import "../MapWithResources.css" // Стилі для компонента
import resourcePoints from "../data/coordinates.json"

// Координати точок у пікселях на зображенні 1024x1024

const MapWithResources = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

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

  const handlePointClick = (message) => {
    alert(message)
  }

  // Визначаємо масштаб на основі вікна
  const scale = Math.min(
    windowDimensions.width / 1024,
    windowDimensions.height / 1024
  )

  return (
    <div className="map-container">
      <img
        src="./mapa.png" // Змініть шлях до вашої карти
        alt="Map"
        className="map-image"
        style={{
          width: `${1024 * scale}px`, // Масштабування ширини зображення
          height: `${1024 * scale}px`, // Масштабування висоти зображення
        }}
      />
      <div className="resource-layer">
        {resourcePoints.map((point) => (
          <div
            key={point.id}
            className="resource-point"
            style={{
              left: `${(point.x / 1024) * 1000 * scale}px`, // Позиціонування точок
              top: `${(point.y / 1024) * 1000 * scale}px`,
            }}
            onClick={() => handlePointClick(point.message)}
          >
            {point.id}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapWithResources
