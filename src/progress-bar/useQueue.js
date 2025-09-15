// useQueue.js
import { useRef, useCallback } from "react";

export function useQueue() {
  const chainRef = useRef(Promise.resolve());

  const enqueue = useCallback((fn) => {
    // Append to the chain and return the task's promise to the caller (optional)
    const p = (chainRef.current = chainRef.current
      .then(() => fn())
      .catch(() => {}));
    return p;
  }, []);

  return enqueue;
}
