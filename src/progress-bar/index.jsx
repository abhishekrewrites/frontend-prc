import React, { useState, useEffect, useRef } from "react";

export default function Progress() {
  const [bars, setBars] = useState(0);
  const [numFilledUpBars, setNumFilledUpBars] = useState(0);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div>
        <button
          onClick={() => {
            setBars(bars + 1);
          }}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {Array(bars)
          .fill(null)
          .map((_, index) => (
            <ProgressBar
              isEmpty={index > numFilledUpBars}
              key={index}
              onCompleted={() => {
                setNumFilledUpBars(numFilledUpBars + 1);
              }}
            />
          ))}
      </div>
    </div>
  );
}

function ProgressBar({ isEmpty, onCompleted }) {
  const [startTransition, setStartTransition] = useState(false);

  useEffect(() => {
    if (isEmpty || startTransition) {
      return;
    }
    setStartTransition(true);
  }, [isEmpty]);

  return (
    <div className="bg-gray-300 h-2 w-[400px]">
      <div
        className={[
          "bg-green-500 h-full scale-x-0 origin-left duration-[2000ms] transition-transform ease-linear",
          startTransition && "scale-x-100",
        ]
          .filter(Boolean)
          .join(" ")}
        onTransitionEnd={() => {
          console.log("1111");
          onCompleted();
        }}
      />
    </div>
  );
}
