import React, { useState, useEffect } from "react";
import ViewTrackers from "./ViewTrackers";
import ConfirmModal from "./ConfirmModal";
import "./Tracker.scss";

function Tracker() {
  const [tableData, setTableData] = useState({});
  const [pendingAction, setPendingAction] = useState(null); // "login" | "logout" | null
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("trackers")) || {};
    setTableData(savedData);
  }, []);

  const todayKey = new Date().toLocaleDateString();
  const todayLog = tableData[todayKey] || {};
  const hasLoggedIn = Boolean(todayLog.login);
  const hasLoggedOut = Boolean(todayLog.logout);
  const hasRecords = Object.keys(tableData).length > 0;

  const confirmActionHandler = () => {
    if (!pendingAction) return;

    if (pendingAction === "clear") {
      try {
        window.localStorage.removeItem("trackers");
        setTableData({});
        setStorageError("");
        setPendingAction(null);
      } catch (error) {
        console.error('Error clearing localStorage key "trackers":', error);
        setStorageError(
          "Unable to clear saved tracking data. Check your browser storage settings and try again.",
        );
      }
      return;
    }

    const now = new Date();
    const dateKey = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const existingData = JSON.parse(localStorage.getItem("trackers")) || {};

    if (!existingData[dateKey]) {
      existingData[dateKey] = {
        login: null,
        logout: null,
        loginTimestamp: null,
        logoutTimestamp: null,
      };
    }

    // Prevent accidental overrides
    if (pendingAction === "login" && existingData[dateKey].login) return;
    if (
      pendingAction === "logout" &&
      (!existingData[dateKey].login || existingData[dateKey].logout)
    )
      return;

    existingData[dateKey][pendingAction] = timeString;
    existingData[dateKey][`${pendingAction}Timestamp`] = now.getTime();

    setTableData(existingData);
    localStorage.setItem("trackers", JSON.stringify(existingData));
    setStorageError("");
    setPendingAction(null);
  };

  return (
    <div className="tracker-container">
      <div className="btn-wrapper">
        <button
          className="custom-button btn-login"
          onClick={() => setPendingAction("login")}
          disabled={hasLoggedIn}
        >
          Log IN
        </button>

        <button
          className="custom-button btn-logout"
          onClick={() => setPendingAction("logout")}
          disabled={!hasLoggedIn || hasLoggedOut}
        >
          Log OUT
        </button>

        <button
          className="custom-button btn-clear"
          onClick={() => {
            setStorageError("");
            setPendingAction("clear");
          }}
          disabled={!hasRecords}
        >
          Clear data
        </button>
      </div>

      <ConfirmModal
        isOpen={Boolean(pendingAction)}
        message={
          pendingAction === "clear"
            ? "Are you sure you want to clear all saved tracking data? This cannot be undone."
            : `Are you sure you want to ${pendingAction === "login" ? "Log IN" : "Log OUT"} now (${new Date().toLocaleTimeString()})? This cannot be undone.`
        }
        onConfirm={confirmActionHandler}
        onCancel={() => setPendingAction(null)}
        confirmLabel={pendingAction === "clear" ? "Clear data" : "Confirm"}
        isDestructive={pendingAction === "clear"}
      />

      {storageError && (
        <p className="storage-error" role="alert">
          {storageError}
        </p>
      )}
      <ViewTrackers tableData={tableData} />
    </div>
  );
}

export default Tracker;
