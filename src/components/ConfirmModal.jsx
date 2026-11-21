import React from "react";

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-btn-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-btn-confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
