import { useState, useRef, useEffect } from "react";
import { TIMER_VALUE } from "./contants";

export function PaloAltoHome() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(TIMER_VALUE);
    return savedTime !== null ? parseInt(savedTime, 10) : 100;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const newTime = prev === 0 ? 0 : prev - 1;
        localStorage.setItem(TIMER_VALUE, newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-6xl">Hello Home</h1>
      <div>{time}</div>
    </div>
  );
}
