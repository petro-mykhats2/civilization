import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import resourcePoints from "../data/coordinates.json"
import "../styles/mapWithResources.scss"
import { addResource } from "../redux/actions"
import ConfirmationModal from "./ConfirmationModal"

const MapWithResources = () => {
  const dispatch = useDispatch()
  const resources = useSelector((state) => state.resources.resources)
  console.log("Отримані ресурси з Redux:", resources)

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [hoveredResourceName, setHoveredResourceName] = useState(null)

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

  const allResearchPoints1to30 = resources.filter(
    (resource) => resource.id >= 1 && resource.id <= 30
  )
  const canActivateNextFields1to15 =
    resources.filter((resource) => resource.id >= 1 && resource.id <= 5)
      .length === 5
  const canActivateNextFields16to30 =
    resources.filter((resource) => resource.id >= 6 && resource.id <= 15)
      .length === 10
  const canActivateNextFields31to50 = allResearchPoints1to30.length === 30 // 30 полів від 1 до 30

  const handlePointClick = (point) => {
    const alreadyResearched = resources.some(
      (resource) => resource.id === point.id
    )
    const isActive =
      (point.id >= 1 && point.id <= 5) ||
      (canActivateNextFields1to15 && point.id >= 6 && point.id <= 15) ||
      (canActivateNextFields16to30 && point.id >= 16 && point.id <= 30) ||
      (canActivateNextFields31to50 && point.id >= 31 && point.id <= 50)

    // Блокуємо можливість дослідження неактивних полів
    if (point.id > 50) {
      alert("Цю область не можна дослідити!")
      return // Виходимо, нічого не робимо
    }

    if (!isActive) {
      alert("Цю область не можна дослідити!")
      return // Виходимо, нічого не робимо
    }

    // Якщо область вже досліджена, показуємо alert з resourceName
    if (alreadyResearched) {
      const resource = resources.find((resource) => resource.id === point.id)
      alert(`Тут знайдено: ${resource.resourceName}`)
      return // Виходимо, щоб не відкрити модальне вікно
    }

    // Якщо область ще не досліджена, відкриваємо модальне вікно
    setSelectedPoint(point)
    setIsModalOpen(true)
  }

  const confirmResearch = () => {
    if (selectedPoint) {
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
        {resourcePoints.map((point) => {
          const alreadyResearched = resources.some(
            (resource) => resource.id === point.id
          )
          const resource = resources.find(
            (resource) => resource.id === point.id
          )
          const isActive =
            (point.id >= 1 && point.id <= 5) ||
            (canActivateNextFields1to15 && point.id >= 6 && point.id <= 15) ||
            (canActivateNextFields16to30 && point.id >= 16 && point.id <= 30) ||
            (canActivateNextFields31to50 && point.id >= 31 && point.id <= 50)

          return (
            <div
              key={point.id}
              className={`resource-point ${
                alreadyResearched ? "researched" : "inactive"
              }`}
              style={{
                left: `${(point.x / 1024) * 1000 * scale}px`,
                top: `${(point.y / 1024) * 1000 * scale}px`,
                backgroundColor: alreadyResearched
                  ? "blue"
                  : isActive
                  ? "red"
                  : "transparent", // Червоний для активних, синій для досліджених
              }}
              onClick={() => handlePointClick(point)}
              onMouseEnter={() =>
                alreadyResearched &&
                setHoveredResourceName(resource.resourceName)
              }
              onMouseLeave={() => setHoveredResourceName(null)}
            >
              {point.id}
            </div>
          )
        })}
        {hoveredResourceName && (
          <div
            className="resource-name-tooltip"
            style={{
              position: "absolute",
              left: "10px",
              top: "10px",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "5px",
            }}
          >
            {hoveredResourceName}
          </div>
        )}
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
