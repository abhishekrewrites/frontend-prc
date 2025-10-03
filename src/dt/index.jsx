import { useState } from "react";
import data from "./employees.json";

const SIZE_ARRAY = [10, 20, 50];

const COLUMNS = [
  { value: "id", id: "id" },
  { value: "name", id: "name" },
  { value: "email", id: "email" },
  { value: "phone", id: "phone" },
  { value: "age", id: "age" },
  { value: "state", id: "state" },
];

function App() {
  const [emp, setEmp] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(SIZE_ARRAY[0]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const start = (currentPage - 1) * size;
  const end = start + size;

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      setSortConfig({ key: null, direction: null });
      setEmp(data);
      return;
    }

    setSortConfig({ key, direction });

    const sortedPage = [...emp].slice(start, end).sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "string" && typeof valB === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB, undefined, { sensitivity: "base" })
          : valB.localeCompare(valA, undefined, { sensitivity: "base" });
      }

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    const updated = [...emp];
    updated.splice(start, size, ...sortedPage);
    setEmp(updated);
  };

  return (
    <div className="p-6">
      <table className="table-auto w-full border-collapse">
        <thead className="">
          <tr>
            {COLUMNS.map((cl) => (
              <th
                key={cl.id}
                className="border-b border-[#ddd] px-4 py-2 text-left font-medium"
              >
                <button
                  onClick={() => handleSort(cl.id)}
                  className="flex items-center gap-1"
                >
                  {cl.value}
                  {sortConfig.key === cl.id && (
                    <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {emp
            .slice(start, end)
            .map(({ id, name, email, phone, age, state }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border-b border-[#ddd] px-4 py-2">{id}</td>
                <td className="border-b border-[#ddd] px-4 py-2">{name}</td>
                <td className="border-b border-[#ddd] px-4 py-2">{email}</td>
                <td className="border-b border-[#ddd] px-4 py-2">{phone}</td>
                <td className="border-b border-[#ddd] px-4 py-2">{age}</td>
                <td className="border-b border-[#ddd] px-4 py-2">{state}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between my-4">
        <select onChange={(e) => setSize(Number(e.target.value))} value={size}>
          {SIZE_ARRAY.map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </select>
        <Pagination
          dataLength={Math.ceil(emp.length / size)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

function Pagination({ dataLength, currentPage, setCurrentPage }) {
  return (
    <div className="flex flex-1 justify-center">
      <button
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev <= 1) {
              return 1;
            }
            return prev - 1;
          })
        }
        className={`h-[40px] w-[40px] border border-[#424242] cursor-pointer flex justify-center items-center rounded-md`}
      >
        {"<"}
      </button>
      {Array(dataLength)
        .fill(null)
        .map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`h-[40px] w-[40px] border border-[#424242] cursor-pointer flex justify-center items-center rounded-md ${
              currentPage === idx + 1 ? "bg-[#ddd]" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}
      <button
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev >= dataLength) {
              return dataLength;
            }
            return prev + 1;
          })
        }
        className={`h-[40px] w-[40px] border border-[#424242] cursor-pointer flex justify-center items-center rounded-md`}
      >
        {">"}
      </button>
    </div>
  );
}

export default App;
