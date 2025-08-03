import React, { useState, useEffect, useRef } from "react";

const SequentialProgressBars = () => {
  const [totalBars, setTotalBars] = useState(0);
  const [currentAnimating, setCurrentAnimating] = useState(0);
  const progressRefs = useRef({});

  const progressBarStyle = {
    width: "0%",
    height: "10px",
    background: "green",
    margin: "10px 0",
    transition: "width 2s ease",
  };

  const add = () => {
    const newTotal = totalBars + 1;
    setTotalBars(newTotal);

    if (currentAnimating === 0) {
      setCurrentAnimating(newTotal); //
    }
  };

  useEffect(() => {
    if (currentAnimating > 0 && currentAnimating <= totalBars) {
      const timer = setTimeout(() => {
        const element = progressRefs.current[currentAnimating];
        if (element) {
          element.style.width = "100%";
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentAnimating, totalBars]);

  const handleTransitionEnd = (barId) => {
    if (barId < totalBars) {
      setCurrentAnimating(barId + 1);
    } else {
      setCurrentAnimating(0);
    }
  };

  const bars = Array.from({ length: totalBars }, (_, i) => i + 1);

  return (
    <div>
      <button onClick={add}>Add</button>
      <div style={{ marginTop: "20px" }}>
        <p>Total progress bars: {totalBars}</p>
        <p>Currently animating: {currentAnimating || "None"}</p>
      </div>
      <div id="root">
        {bars.map((barNumber) => (
          <div key={barNumber}>
            <div style={{ fontSize: "12px", marginBottom: "5px" }}>
              Progress {barNumber}
              {currentAnimating === barNumber
                ? " 🏃‍♂️"
                : currentAnimating > barNumber
                ? " ✅"
                : " ⏳"}
            </div>
            <div style={{ border: "1px solid black" }}>
              <div
                ref={(el) => (progressRefs.current[barNumber] = el)}
                style={progressBarStyle}
                onTransitionEnd={() => handleTransitionEnd(barNumber)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequentialProgressBars;
