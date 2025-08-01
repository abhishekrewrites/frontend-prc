import React, { useState } from "react";

const CollapsibleNode = ({ children, label, closingChar }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const expanderIcon = isExpanded ? "▾" : "▸";

  return (
    <div>
      <span onClick={toggleExpand} style={{ cursor: "pointer" }}>
        {expanderIcon} {label}
      </span>

      {isExpanded ? (
        <div style={{ marginLeft: "20px" }}>
          {children}
          {closingChar}
        </div>
      ) : (
        <span style={{ marginLeft: "5px" }}>{closingChar}</span>
      )}
    </div>
  );
};

const JsonDisplay = ({ data }) => {
  if (data === null) {
    return <span style={{ color: "#808080" }}>null</span>;
  }

  if (typeof data !== "object") {
    if (typeof data === "string") {
      return <span style={{ color: "#228B22" }}>"{data}"</span>;
    }
    return <span style={{ color: "#0000FF" }}>{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <CollapsibleNode label="[" closingChar="]">
        {data.map((item, index) => (
          <div key={index}>
            <JsonDisplay data={item} />
            {index < data.length - 1 && ","}
          </div>
        ))}
      </CollapsibleNode>
    );
  }

  const keys = Object.keys(data);
  return (
    <CollapsibleNode label="{" closingChar="}">
      {keys.map((key, index) => (
        <div key={key}>
          <strong style={{ color: "#A020F0" }}>"{key}"</strong>:{" "}
          <span style={{ marginLeft: "5px" }}>
            <JsonDisplay data={data[key]} />{" "}
          </span>
          {index < keys.length - 1 && ","}
        </div>
      ))}
    </CollapsibleNode>
  );
};

export default JsonDisplay;
