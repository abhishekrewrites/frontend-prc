import { useState } from "react";

const CollapsibleNode = ({ children, label, closingChar }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => setIsExpanded((s) => !s);
  const expanderIcon = isExpanded ? "▾" : "▸";

  return (
    <div>
      <span
        onClick={toggleExpand}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {expanderIcon} {label}
        {!isExpanded && <> … {closingChar}</>}
      </span>
      {isExpanded && (
        <div style={{ marginLeft: 20 }}>
          {children}
          <span>{closingChar}</span>
        </div>
      )}
    </div>
  );
};

// NEW: renders one "key: value" row; makes it collapsible only if needed
const KeyValueRow = ({ k, value, isLast }) => {
  const t = typeof value;

  // primitives (and null/undefined)
  if (value === null || t !== "object") {
    const renderPrimitive = () => {
      if (t === "string")
        return <span style={{ color: "#228B22" }}>"{value}"</span>;
      if (t === "number" || t === "bigint")
        return <span style={{ color: "#0000FF" }}>{String(value)}</span>;
      if (t === "boolean")
        return <span style={{ color: "#D2691E" }}>{String(value)}</span>;
      if (t === "undefined")
        return <span style={{ color: "#808080" }}>undefined</span>;
      if (t === "symbol")
        return <span style={{ color: "#808080" }}>{value.toString()}</span>;
      return <span>{String(value)}</span>;
    };

    return (
      <div>
        <strong style={{ color: "#A020F0" }}>"{k}"</strong>: {renderPrimitive()}
        {!isLast && ","}
      </div>
    );
  }

  // arrays
  if (Array.isArray(value)) {
    return (
      <CollapsibleNode
        label={
          <>
            <strong style={{ color: "#A020F0" }}>"{k}"</strong>: {"["}
          </>
        }
        closingChar={"]"}
      >
        {value.map((item, i) => (
          <div key={i}>
            <JsonDisplay data={item} />
            {i < value.length - 1 && ","}
          </div>
        ))}
      </CollapsibleNode>
    );
  }

  // objects
  const keys = Object.keys(value);
  return (
    <CollapsibleNode
      label={
        <>
          <strong style={{ color: "#A020F0" }}>"{k}"</strong>: {"{"}
        </>
      }
      closingChar={"}"}
    >
      {keys.map((ck, i) => (
        <KeyValueRow
          key={ck}
          k={ck}
          value={value[ck]}
          isLast={i === keys.length - 1}
        />
      ))}
    </CollapsibleNode>
  );
};

const JsonDisplay = ({ data }) => {
  if (data === null) return <span style={{ color: "#808080" }}>null</span>;
  if (typeof data !== "object") {
    if (typeof data === "string")
      return <span style={{ color: "#228B22" }}>"{data}"</span>;
    return <span style={{ color: "#0000FF" }}>{String(data)}</span>;
  }

  // root array
  if (Array.isArray(data)) {
    return (
      <CollapsibleNode label={"["} closingChar={"]"}>
        {data.map((item, i) => (
          <div key={i} className="ml-2">
            <JsonDisplay data={item} />
            {i < data.length - 1 && ","}
          </div>
        ))}
      </CollapsibleNode>
    );
  }

  // root object — render rows so each key can own its expander
  const keys = Object.keys(data);
  return (
    <div>
      {"{"}
      <div style={{ marginLeft: 20 }}>
        {keys.map((k, i) => (
          <KeyValueRow
            key={k}
            k={k}
            value={data[k]}
            isLast={i === keys.length - 1}
          />
        ))}
      </div>
      {"}"}
    </div>
  );
};

export default JsonDisplay;
