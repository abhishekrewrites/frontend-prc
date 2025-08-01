import { useRef, useCallback } from "react";

function GridComponent({ data, setSkip, limit }) {
  const observer = useRef(null);

  const lastImageRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setSkip((prevSkip) => prevSkip + limit);
          }
        },
        {
          threshold: 0.5,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [setSkip]
  );

  return (
    <div className="grid grid-cols-5 gap-2">
      {data?.products?.map((pro, idx) => {
        const imageUrl = pro?.images?.[0] ?? "";
        if (data?.products?.length === idx + 1) {
          return (
            <div
              ref={lastImageRef}
              key={idx}
              className="h-[200px] w-[200px] border border-indigo-600"
            >
              <img
                src={imageUrl}
                className="flex object-cover w-full h-[150px]"
              />
              <h5>{pro?.title}</h5>
            </div>
          );
        } else {
          return (
            <div
              key={idx}
              className="h-[200px] w-[200px] border border-indigo-600"
            >
              <img
                src={imageUrl}
                className="flex object-cover w-full h-[150px]"
              />
              <h5>{pro?.title}</h5>
            </div>
          );
        }
      })}
    </div>
  );
}

export default GridComponent;
