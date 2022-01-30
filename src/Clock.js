import React, { useState, useEffect } from "react";
import Number from "./Number";

const Clock = () => {
  const getDateString = () => {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${hours}-${minutes}-${seconds}`;
  };

  const [dateString, setDateString] = useState(getDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateString(getDateString());
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  });

  return (
    <div>
      <Number value={dateString} animate={true} />
    </div>
  );
};

export default Clock;
