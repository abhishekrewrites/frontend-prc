import { useEffect, useState } from "react";

const LIMIT = 10;

function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [start, setStart] = useState(0);

  async function fetchPosts() {
    const resp = await fetch();
    const response = await resp.json();
    setData(response);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {data.map((item, idx) => {
        return <div>{item.title}</div>;
      })}
    </div>
  );
}

export default InfiniteScroll;
