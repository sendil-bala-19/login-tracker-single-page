import React, { useState, useEffect } from "react";

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
    <div>
      <h2>Current Time: {time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default CurrentTime;
