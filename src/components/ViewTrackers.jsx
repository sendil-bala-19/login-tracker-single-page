import React from "react";

function ViewTrackers({ tableData }) {
  const entries = tableData ? Object.entries(tableData) : [];

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

  if (entries.length === 0) {
    return <p className="empty-message">No tracking logs recorded yet.</p>;
  }

  return (
    <table className="tracker-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Log IN</th>
          <th>Log OUT</th>
          <th>Work Hours</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([date, logs]) => (
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
  );
}

export default ViewTrackers;
