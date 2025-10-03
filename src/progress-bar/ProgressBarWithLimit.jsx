import { useEffect, useState } from "react";

const CONCURRENCY_LIMIT = 3;

function ProgressBarLimit() {
  const [bars, setBars] = useState(0);
  const [filledBars, setFilledBars] = useState(0);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setBars(bars + 1);
          }}
        >
          Add
        </button>
      </div>
      {Array(bars)
        .fill(null)
        .map((_, idx) => (
          <ProgressBar
            key={idx}
            isEmpty={idx >= filledBars && CONCURRENCY_LIMIT}
            onComplete={() => setFilledBars(filledBars + 1)}
          />
        ))}
    </div>
  );
}

function ProgressBar({ isEmpty, onComplete }) {
  const [startTransition, setStartTransition] = useState(false);
  useEffect(() => {
    if (isEmpty && startTransition) {
      return;
    }

    setStartTransition(true);
  }, [isEmpty]);

  return (
    <div className="h-[300px] w-[24px] rounded-md">
      <div
        className={[
          "scale-x-0 h-full bg-green-500 transition-transform origin-left delay-2000 ease-linear",
          startTransition && "scale-x-100",
        ]
          .filter(Boolean)
          .join(" ")}
        onTransitionEnd={() => {
          onComplete();
        }}
      ></div>
    </div>
  );
}
