import React, { useState } from "react";
import "./ViewTrackers.scss";

function ViewTrackers({ tableData }) {
  const entries = tableData ? Object.entries(tableData) : [];
  const [activeTab, setActiveTab] = useState("today");
  const todayKey = new Date().toLocaleDateString();
  const todayEntries = entries.filter(([date]) => date === todayKey);

  const calculateWorkHours = (loginTs, logoutTs) => {
    if (!loginTs || !logoutTs) return "—";

    const diffMs = logoutTs - loginTs;
    if (diffMs < 0) return "Invalid";

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const renderTable = (visibleEntries, emptyMessage) => {
    if (visibleEntries.length === 0) {
      return <p className="empty-message">{emptyMessage}</p>;
    }

    return (
      <div className="table-scroll">
        <table className="tracker-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Log IN</th>
              <th scope="col">Log OUT</th>
              <th scope="col">Work Hours</th>
            </tr>
          </thead>
          <tbody>
            {visibleEntries.map(([date, logs]) => (
              <tr key={date}>
                <td>{date}</td>
                <td>{logs.login || "—"}</td>
                <td>{logs.logout || "—"}</td>
                <td>
                  {calculateWorkHours(logs.loginTimestamp, logs.logoutTimestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="tracker-history">
      <div className="tracker-tabs" role="tablist" aria-label="Tracking records">
        <button
          className="tracker-tab"
          id="today-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === "today"}
          aria-controls="today-panel"
          onClick={() => setActiveTab("today")}
        >
          Today
        </button>
        <button
          className="tracker-tab"
          id="all-records-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          aria-controls="all-records-panel"
          onClick={() => setActiveTab("all")}
        >
          All records
        </button>
      </div>

      <section
        className="tracker-panel"
        id="today-panel"
        role="tabpanel"
        aria-labelledby="today-tab"
        hidden={activeTab !== "today"}
      >
        {renderTable(todayEntries, "No tracking logs recorded for today.")}
      </section>
      <section
        className="tracker-panel"
        id="all-records-panel"
        role="tabpanel"
        aria-labelledby="all-records-tab"
        hidden={activeTab !== "all"}
      >
        {renderTable(entries, "No tracking logs recorded yet.")}
      </section>
    </div>
  );
}

export default ViewTrackers;
