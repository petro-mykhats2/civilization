import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import resourcePoints from "../data/coordinates.json"
import "../styles/mapWithResources.scss"
import { addResource } from "../redux/actions"

const MapWithResources = () => {
  const dispatch = useDispatch() // Хук для доступу до dispatch
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

  const handlePointClick = (point) => {
    // Диспатч дії для додавання ресурсу
    dispatch(addResource(point))
    alert(point.message) // Можна залишити попереднє сповіщення
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
    </div>
  )
}

export default MapWithResources
