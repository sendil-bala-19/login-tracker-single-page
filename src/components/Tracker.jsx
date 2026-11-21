import React, { useState, useEffect } from "react";
import ViewTrackers from "./ViewTrackers";

function Tracker() {
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("trackers")) || {};
    setTableData(savedData);
  }, []);

  const trackHandler = (actionType) => {
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

    // Save both the display string and raw timestamp in milliseconds
    existingData[dateKey][actionType] = timeString;
    existingData[dateKey][`${actionType}Timestamp`] = now.getTime();

    setTableData(existingData);
    localStorage.setItem("trackers", JSON.stringify(existingData));
  };

  return (
    <div>
      <div className="btn-wrapper">
        <button className="custom-button" onClick={() => trackHandler("login")}>
          Log IN
        </button>
        <button
          className="custom-button"
          onClick={() => trackHandler("logout")}
        >
          Log OUT
        </button>
      </div>
      <ViewTrackers tableData={tableData} />
    </div>
  );
}

export default Tracker;
