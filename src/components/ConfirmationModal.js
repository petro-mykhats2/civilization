import React from "react"
import "../styles/modal.scss"

const ConfirmationModal = ({ isOpen, onClose, onConfirm, resourceId }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Підтвердження</h2>
        <p>Ви дійсно хочете дослідити область {resourceId}?</p>
        <button className="modal-button confirm" onClick={onConfirm}>
          Так
        </button>
        <button className="modal-button cancel" onClick={onClose}>
          Ні
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
