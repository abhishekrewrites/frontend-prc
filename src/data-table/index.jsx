import { useState, useCallback, useMemo } from "react";
import data from "./students.json";

const HEADERS = ["id", "name", "age", "gender", "marks"];

const DROPDOWN_OPTIONS = [
  { value: "all", label: "All" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

function Wrapper() {
  const [gender, setGender] = useState("all");
  const [text, setText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (gender !== "all") {
      result = result.filter(
        (item) => item.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    if (text) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        let aValue = a.marks[sortConfig.key];
        let bValue = b.marks[sortConfig.key];

        if (sortConfig.direction === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    return result;
  }, [gender, text, sortConfig]);

  const marksKeys = useMemo(() => {
    return data.length > 0 ? Object.keys(data[0].marks) : [];
  }, []);

  const handleSort = useCallback((subjectKey) => {
    setSortConfig((prevConfig) => {
      // If clicking the same column, toggle direction
      if (prevConfig.key === subjectKey) {
        if (prevConfig.direction === "asc") {
          return { key: subjectKey, direction: "desc" };
        } else if (prevConfig.direction === "desc") {
          return { key: null, direction: null }; // Reset sorting
        } else {
          return { key: subjectKey, direction: "asc" };
        }
      }
      // If clicking a different column, start with ascending
      return { key: subjectKey, direction: "asc" };
    });
  }, []);

  return (
    <div>
      <div className="flex">
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          {DROPDOWN_OPTIONS.map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Search by name..."
        />
      </div>
      <DataTable
        tableData={filteredAndSortedData}
        marksKeys={marksKeys}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
}

function DataTable({ tableData, marksKeys, sortConfig, onSort }) {
  return (
    <div className="overflow-auto rounded-md border border-gray-300 m-4">
      <table className="min-w-full text-sm border-collapse text-left">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            {HEADERS.map((key) =>
              key === "marks" ? (
                <th
                  key={key}
                  colSpan={marksKeys.length}
                  className="p-3 text-center border"
                >
                  Marks
                </th>
              ) : (
                <th key={key} rowSpan={2} className="p-3 text-center border">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              )
            )}
          </tr>

          <tr>
            {marksKeys.map((subjectKey) => (
              <th key={subjectKey} className="p-3 border">
                <div className="flex justify-center items-center">
                  {subjectKey}
                  <div className="flex flex-col ml-2">
                    <div
                      onClick={() => onSort(subjectKey)}
                      className={`cursor-pointer ${
                        sortConfig.key === subjectKey &&
                        sortConfig.direction === "asc"
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      &#8963;
                    </div>
                    <div
                      onClick={() => onSort(subjectKey)}
                      className={`cursor-pointer ${
                        sortConfig.key === subjectKey &&
                        sortConfig.direction === "desc"
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      &#8964;
                    </div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3 text-center border">{item.id}</td>
              <td className="p-3 text-center border">{item.name}</td>
              <td className="p-3 text-center border">{item.age}</td>
              <td className="p-3 text-center border">{item.gender}</td>
              {marksKeys.map((subjectKey) => (
                <td key={subjectKey} className="p-3 text-center border">
                  {item.marks[subjectKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Wrapper;
