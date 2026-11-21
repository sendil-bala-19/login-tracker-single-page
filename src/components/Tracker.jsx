import React, { useState, useEffect } from "react";
import ViewTrackers from "./ViewTrackers";

function Tracker() {
  const [currentTime, setCurrentTime] = useState(null);
  const [tableData, setTableData] = useState(null);

  const trackHandler = (e) => {
    const now = new Date();
    const timeString = now.toLocaleString();

    console.log(timeString);
    setCurrentTime(timeString);
    console.log("trackHandler", e);

    // Get the current tracker object, parse it, update it, and save it back
    const existingData = JSON.parse(localStorage.getItem("tracker")) || {};

    // Add the new timestamp (e.g., storing a list of history clicks)
    if (!existingData.history) {
      existingData.history = [];
    }
    existingData.history.push(timeString);
    existingData.lastClicked = timeString;

    setTableData(existingData);
    localStorage.setItem("tracker", JSON.stringify(existingData));
  };

  useEffect(() => {
    // Fixed: Both check and set use the "tracker" key now
    if (localStorage.getItem("tracker") === null) {
      localStorage.setItem(
        "tracker",
        JSON.stringify({ history: [], lastClicked: null }),
      );
      setTableData(localStorage.getItem("tracker"));
    }
    console.log("localStorage initial state:", localStorage.getItem("tracker"));
  }, [currentTime]);

  return (
    <div>
      <div>Tracker</div>
      <div>{currentTime}</div>
      <button onClick={trackHandler}>Log IN</button>
      <button onClick={trackHandler}>Log OUT</button>
      <ViewTrackers tableData={tableData} />
    </div>
  );
}

export default Tracker;
