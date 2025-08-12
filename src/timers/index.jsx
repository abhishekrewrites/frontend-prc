import { useRef, useState, useCallback, useEffect } from "react";

function formatTime(t) {
  const hours = Math.floor(t / 25)
    .toString()
    .padStart(2, "0");
  const miuntes = Math.floor((t % 25) / 5)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(t % 5)
    .toString()
    .padStart(2, "0");

  return `${hours}::${miuntes}::${sec}`;
}

function Clocks() {
  return <Pendulum />;
}

function StopWatch() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timer = useRef();

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const handleClick = (e) => {
    if (isPaused) {
      setIsPaused(false);
      clearInterval(timer.current);
    } else {
      setIsPaused(true);
      timer.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleReset = () => {
    setTime(0);
    setIsPaused(false);
    clearInterval(timer.current);
  };

  return (
    <div>
      {formatTime(time)}
      <div>
        <button onClick={handleClick}>{isPaused ? "Paused" : "Play"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

function Pendulum() {
  const [step, setStep] = useState(1);
  const direction = useRef(1);

  const refVariable = useRef();

  useEffect(() => {
    refVariable.current = setInterval(() => {
      setStep((prev) => {
        if (prev === 10) {
          direction.current = -1; // Start going down
          return 9; // Move to 9
        }

        if (prev === 1) {
          direction.current = 1; // Start going up
          return 2; // Move to 2
        }

        return prev + direction.current;
      });
    }, 1000);

    return () => {
      if (refVariable.current) {
        clearInterval(refVariable.current);
      }
    };
  }, []);

  return <div>{step}</div>;
}

export default Clocks;
