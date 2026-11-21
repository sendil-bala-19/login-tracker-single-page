import React, { useState, useEffect } from "react";
import ViewTrackers from "./ViewTrackers";
import ConfirmModal from "./ConfirmModal";

function Tracker() {
  const [tableData, setTableData] = useState({});
  const [pendingAction, setPendingAction] = useState(null); // "login" | "logout" | null

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("trackers")) || {};
    setTableData(savedData);
  }, []);

  const todayKey = new Date().toLocaleDateString();
  const todayLog = tableData[todayKey] || {};
  const hasLoggedIn = Boolean(todayLog.login);
  const hasLoggedOut = Boolean(todayLog.logout);

  const confirmActionHandler = () => {
    if (!pendingAction) return;

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
      </div>

      <ConfirmModal
        isOpen={Boolean(pendingAction)}
        message={`Are you sure you want to ${pendingAction === "login" ? "Log IN" : "Log OUT"} now (${new Date().toLocaleTimeString()})? This cannot be undone.`}
        onConfirm={confirmActionHandler}
        onCancel={() => setPendingAction(null)}
      />

      <ViewTrackers tableData={tableData} />
    </div>
  );
}

export default Tracker;
