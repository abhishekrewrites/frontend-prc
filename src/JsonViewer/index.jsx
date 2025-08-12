import { useState } from "react";
import JsonDisplay from "./JSONDisplay";

function Home() {
  const [pastedData, setPastedData] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [err, setErr] = useState("");

  const handleParseData = () => {
    try {
      const parsed = JSON.parse(pastedData);
      setParsedData(parsed);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div>
      <div className="flex">
        <textarea
          value={pastedData}
          onChange={(e) => {
            setPastedData(e.target.value);
            setParsedData(null);
            setErr("");
          }}
        />
        <button onClick={handleParseData}>Parse JSON</button>
      </div>
      {!err && parsedData !== null ? (
        <JsonDisplay data={parsedData} />
      ) : (
        <span>{err}</span>
      )}
    </div>
  );
}

export default Home;
