import React from "react";

import "./ConfirmModal.scss";

function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  isDestructive = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-box"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-message"
      >
        <p className="modal-message" id="modal-message">
          {message}
        </p>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-btn-cancel">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`modal-btn-confirm${isDestructive ? " is-destructive" : ""}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
