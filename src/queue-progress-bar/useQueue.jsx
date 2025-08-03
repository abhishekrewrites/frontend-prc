import React, { useState } from "react";

const SimpleProgressQueue = () => {
  const [queue, setQueue] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const addProgress = () => {
    const newItem = { id: Date.now() };

    setQueue((prev) => {
      const newQueue = [...prev, newItem];

      // Start animation if nothing is running
      if (!isAnimating) {
        startAnimation(newQueue);
      }

      return newQueue;
    });
  };

  const startAnimation = async (currentQueue) => {
    if (currentQueue.length === 0) {
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);

    // Wait for 2 seconds (animation duration)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Remove completed item and process next
    setQueue((prev) => {
      const remaining = prev.slice(1);
      setTimeout(() => startAnimation(remaining), 100);
      return remaining;
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <button
        onClick={addProgress}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Progress Bar ({queue.length} in queue)
      </button>

      {queue.length > 0 && (
        <div>
          {/* Currently Animating */}
          <div className="mb-4">
            <div className="text-sm mb-2">
              {isAnimating ? "Animating..." : "Starting..."}
            </div>
            <div className="w-full h-6 bg-gray-200 rounded-full">
              <div
                className={`h-full bg-blue-500 rounded-full transition-all duration-[2000ms] ease-out ${
                  isAnimating ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>

          {/* Remaining Queue */}
          {queue.slice(1).map((item, index) => (
            <div
              key={item.id}
              className="w-full h-4 bg-gray-200 rounded-full mb-2"
            >
              <div className="text-xs text-gray-500">
                Waiting... (Position: {index + 1})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleProgressQueue;
