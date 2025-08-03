import { useState, useEffect } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-[300px] mt-3 h-[24px] rounded-md relative bg-gray-200">
      <div
        className="h-full absolute rounded-[inherit] transition-all duration-[1000ms] ease-out bg-red-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
