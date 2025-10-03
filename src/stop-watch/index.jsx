import { useEffect, useState, useRef } from "react";

function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef();

  function formatTime(t) {
    const hrs = Math.floor(t / (60 * 60))
      .toString()
      .padStart("0", 2);
    const mins = Math.floor(t / 60)
      .toString()
      .padStart("0", 2);
    const secs = Math.floor(t % 60)
      .toString()
      .padStart("0", 2);
    const ms = Math.floor((t % 1) * 100);
    return `${hrs}:${mins}:${secs}:${ms}`;
  }

  function startTimer() {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prv) => prv + 0.1);
    }, 100);
  }

  function pauseTimer() {
    if (isRunning) {
      setIsRunning(false);
    }
    clearInterval(timerRef.current);
  }

  function reset() {
    clearInterval(timerRef.current);
    setTime(0);
  }

  function onStart() {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  return (
    <div>
      <div>{formatTime(time)}</div>
      <div>
        <button onClick={onStart}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default StopWatch;
