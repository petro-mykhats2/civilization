import React, { useEffect, useState } from "react"

const DisplayUserName = () => {
  const [userName, setUserName] = useState("")

  // Зчитуємо дані з localStorage при монтуванні компонента
  useEffect(() => {
    const savedUserName = localStorage.getItem("userName")
    if (savedUserName) {
      setUserName(savedUserName)
    }
  }, [])

  return (
    <div>
      {userName ? (
        <h2>Збережене ім'я користувача: {userName}</h2>
      ) : (
        <h2>Ім'я користувача не збережено.</h2>
      )}
    </div>
  )
}

export default DisplayUserName
