import { useState, useCallback, useEffect } from "react";
import Pages from "./Pages";

const API_URL = "https://dummyjson.com/products?limit=194";
const LIMIT = 10;

function Pagination({}) {
  const [data, setData] = useState({ products: [], total: 0 });
  const [currenntPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    setData(data);
  };

  const totalPage = Math.ceil(data.total / 10);
  const start = (currenntPage - 1) * LIMIT;
  const end = currenntPage * LIMIT;

  console.log(start, end, "000");

  return (
    <div className="">
      <div className="grid grid-cols-5 gap-2">
        {data.products.slice(start, end).map((pro, idx) => {
          const imageUrl = pro?.images?.[0];
          return (
            <div key={pro.id} className="h-[200px] w-[200px]">
              <img src={imageUrl} className="h-[100px] w-full" />
            </div>
          );
        })}
      </div>
      <Pages
        totalPages={totalPage}
        setCurrentPage={setCurrentPage}
        currenntPage={currenntPage}
      />
    </div>
  );
}

export default Pagination;
