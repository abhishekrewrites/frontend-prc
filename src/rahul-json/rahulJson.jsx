import { useState } from "react";

function RahulJSON({ data }) {
  return (
    <div>
      <JsonValue value={data} isRoot={true} depth={0} />
    </div>
  );
}

function JsonValue({ value, depth = 0, isRoot = false }) {
  if (value === null) return <JsonPrimitive value={value} type={"null"} />;
  if (typeof value === "string")
    return <JsonPrimitive value={value} type={"string"} />;
  if (typeof value === "number")
    return <JsonPrimitive value={value} type={"number"} />;
  if (typeof value === "boolean")
    return <JsonPrimitive value={value} type={"boolean"} />;
  if (Array.isArray(value))
    return <JsonArray value={value} isRoot={isRoot} depth={depth} />;
  if (typeof value === "object")
    return <JsonObject value={value} isRoot={isRoot} depth={depth} />;

  return <JsonValue value={value} type={"unknown"} />;
}

function JsonPrimitive({ value }) {
  const display =
    typeof value === "string" ? (
      <span>"{value}"</span>
    ) : (
      <span>{String(value)}</span>
    );
  return display;
}

function JsonArray({ value, depth, isRoot }) {
  const [isExpanded, setIsExpanded] = useState(isRoot);
  const indent = " ".repeat(depth);

  if (value.length === 0) {
    return <span>[]</span>;
  }

  return (
    <span>
      <span onClick={(e) => setIsExpanded(!isExpanded)}>
        {isExpanded ? "⏷" : "⏵"}
      </span>
      {isExpanded ? (
        <>
          <span>[</span>
          <div className="json-content">
            {value.map((item, index) => (
              <div key={index} className="json-item">
                {indent} <span className="json-key">"{index}"</span>:{" "}
                <JsonValue value={item} depth={depth + 1} />
              </div>
            ))}
          </div>
          <span>]</span>
        </>
      ) : (
        <span>[{value.length}] [...]</span>
      )}
    </span>
  );
}

function JsonObject({ value, depth, isRoot }) {
  console.log(value, "22222");
  const [isExpanded, setIsExpanded] = useState(isRoot);
  const keys = Object.keys(value);
  const indent = " ".repeat(depth);

  if (keys.length === 0) {
    return <span>{"{}"}</span>;
  }

  return (
    <span>
      <span onClick={(e) => setIsExpanded(!isExpanded)}>
        {isExpanded ? "⏷" : "⏵"}
      </span>
      <span>{"{"}</span>
      {isExpanded ? (
        <>
          <div>
            {keys.map((key, idx) => (
              <div key={idx}>
                {indent} <span>"{key}"</span>:{" "}
                <JsonValue value={value[key]} depth={depth + 1} />
              </div>
            ))}
          </div>
          <div>{"}"}</div>
        </>
      ) : (
        <span>
          {keys.length}
          {"}"} {"{...}"}
        </span>
      )}
    </span>
  );
}

export default RahulJSON;
