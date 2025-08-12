import { useEffect, useState } from "react";

function Green() {
  const [order, setOrder] = useState([]);
  const [grid, setGrid] = useState(new Array(9).fill(false));

  useEffect(() => {
    //check every item is clicked or not
    if (grid.every((item) => item)) {
      alert("all items are clicked");
      const timer = setTimeout(() => {
        reverseOrder();
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [grid]);

  const reverseOrder = () => {
    const reverse = order.reverse();
    reverse.forEach((it, idx) => {
      setTimeout(() => {
        setGrid((prev) => {
          const copy = [...prev];
          copy[it] = false;
          return copy;
        });
      }, idx * 400);
    });
  };

  return (
    <div className="grid grid-cols-3 w-[400px]">
      {grid.map((it, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (!grid[idx]) {
              const d = [...grid];
              d[idx] = true;
              setGrid(d);
              setOrder([...order, idx]);
            }
          }}
          className={`flex h-[100px] justify-center items-center border border-solid ${
            it ? "bg-green-600" : "bg-white"
          }`}
        >
          {idx + 1}
        </div>
      ))}
    </div>
  );
}

export default Green;
