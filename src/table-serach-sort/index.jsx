import { useState, useCallback, useMemo } from "react";
import data from "./data.json";
import "./styles.css";

const HEADER_ITEMS = ["id", "name", "username", "email"];

function debounce(cb, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
}

function TableSearchSort() {
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: null,
  });

  // ✅ Filter from original data, not filtered data
  const filteredData = useMemo(() => {
    if (!query.trim()) return data;
    return data.filter((row) =>
      row.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // ✅ Sort the filtered data
  const sortedData = useMemo(() => {
    if (!sortConfig.field || !sortConfig.direction) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];

      if (sortConfig.direction === "asc") {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });
  }, [filteredData, sortConfig]);

  // ✅ Proper debounced search
  const debouncedSearch = useCallback(
    debounce((value) => setQuery(value), 300),
    []
  );

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  // ✅ Simplified sort toggle
  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field !== field) {
        return { field, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { field, direction: "desc" };
      }
      return { field: null, direction: null };
    });
  };

  // ✅ Helper to render sort icon
  const getSortIcon = (field) => {
    if (sortConfig.field !== field) return "↕️";
    return sortConfig.direction === "asc" ? "🔼" : "🔽";
  };

  // ✅ Helper to highlight matched text
  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        onChange={handleChange}
        placeholder="Search by name..."
        style={{
          border: "1px solid #ddd",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "20px",
          minWidth: "300px",
        }}
      />

      <div style={{ marginBottom: "10px", color: "#666" }}>
        Showing {sortedData.length} of {data.length} users
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            {HEADER_ITEMS.map((item) => (
              <th
                key={item}
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#f2f2f2",
                  cursor: item === "name" ? "pointer" : "default",
                  userSelect: "none",
                }}
                onClick={item === "name" ? () => handleSort(item) : undefined}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  {item === "name" && <span>{getSortIcon(item)}</span>}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {row.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {highlightMatch(row.name, query)}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {row.username}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {row.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSearchSort;
