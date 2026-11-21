import React, { useState, useEffect } from "react";
import "./CurrentTime.scss";

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every 1000ms (1 second)
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="current-time">
      <p className="current-time-label">Current time</p>
      <time className="current-time-value" dateTime={time.toISOString()}>
        {time.toLocaleTimeString()}
      </time>
    </div>
  );
}

export default CurrentTime;
