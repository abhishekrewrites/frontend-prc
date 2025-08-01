import { useEffect, useState } from "react";
import GridComponent from "./GridComponent";

const LIMIT = 10; 

function App() {
  const [text, setText] = useState("phone"); 
  const [data, setData] = useState({ products: [], total: 0 });
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchFirstPage = async () => {
      const resp = await fetch(`https://dummyjson.com/products/search?q=${text}&limit=${LIMIT}&skip=0`);
      const newData = await resp.json();
      setData(newData); 
      setSkip(0); 
    };

    fetchFirstPage();
  }, [text]); 

  useEffect(() => {
    if (skip > 0 && data.products.length < data.total) {
      const fetchNextPage = async () => {
        const resp = await fetch(`https://dummyjson.com/products/search?q=${text}&limit=${LIMIT}&skip=${skip}`);
        const newData = await resp.json();
        
        setData((prevData) => ({
          ...newData,
          products: [...prevData.products, ...newData.products],
        }));
      };

      fetchNextPage();
    }
  }, [skip]); 

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <input
        className="border border-indigo-600 p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search for products..."
      />
      <GridComponent data={data} setSkip={setSkip} limit={LIMIT} />
    </main>
  );
}

export default App;
