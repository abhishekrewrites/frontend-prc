import React, { useState, useEffect, useRef } from "react";

export default function Progress() {
  const [queue, setQueue] = useState([]);
  const [currentAnimating, setCurrentAnimating] = useState(null);

  function handleClick() {
    setQueue((q) => [...q, { id: Date.now() }]);
  }

  useEffect(() => {
    if (currentAnimating === null && queue.length > 0) {
      setCurrentAnimating(0);
    }
  }, [queue, currentAnimating]);

  useEffect(() => {
    if (currentAnimating !== null && currentAnimating < queue.length) {
      let timer = setTimeout(() => {
        setCurrentAnimating(currentAnimating + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentAnimating, queue.length]);

  return (
    <>
      <button onClick={handleClick}>Add Progress Bar</button>
      <div style={{ marginTop: "1rem", marginLeft: "20px" }}>
        {queue.map((bar, index) => {
          const isActive = index === currentAnimating;
          return <ProgressBar key={bar.id} animate={isActive} />;
        })}
      </div>
    </>
  );
}

function ProgressBar({ animate }) {
  const [step, setStep] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    if (animate) {
      setStep(0);
      interval.current = setInterval(() => {
        setStep((s) => {
          if (s >= 5) {
            clearInterval(interval.current);
            return s;
          }
          return s + 1;
        });
      }, 400);
    }
    return () => clearInterval(interval.current);
  }, [animate]);

  return (
    <div
      style={{
        width: "300px",
        height: "20px",
        backgroundColor: "#e0e0e0",
        margin: "4px 0",
      }}
    >
      <div
        style={{
          width: `${(step * 100) / 5}%`,
          height: "100%",
          backgroundColor: "blue",
          transition: "width 400ms linear",
        }}
      />
    </div>
  );
}
