import { useState } from "react";
import data from "./demo.json";

const View = ({ tree, insertNode, nodeId = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUtility, setShowUtility] = useState(false);
  const [input, setInput] = useState({
    isVisible: false,
    isFolder: false,
  });

  const currentNodeNode = tree[nodeId];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInsert = (e) => {
    if (e.key === "Enter" && e.target.value) {
      insertNode(currentNodeNode.id, e.target.value, input.isFolder);
      e.target.value = "";
      setInput({ ...input, isVisible: false, isFolder: false });
    }
  };

  if (currentNodeNode.isFolder) {
    return (
      <div>
        <div
          onClick={() => handleToggle()}
          className="flex"
          onMouseEnter={(e) => setShowUtility(true)}
          onMouseLeave={(e) => setShowUtility(false)}
        >
          <span className="mr-2 bg-yellow-400">📂</span>
          <span>{currentNodeNode.name}</span>
          {showUtility ? (
            <div className="flex">
              <button
                onClick={() =>
                  setInput({ ...input, isVisible: true, isFolder: false })
                }
              >
                🗄️
              </button>
              <button
                onClick={() =>
                  setInput({ ...input, isVisible: true, isFolder: true })
                }
              >
                📂
              </button>
              <button>🗑️</button>
            </div>
          ) : null}
        </div>

        {input.isVisible && (
          <div className="flex">
            <div>{input.isFolder ? "📂" : "🗄️"}</div>
            <input
              onKeyDown={(e) => handleInsert(e)}
              className="flex border border-indigo-500"
            />
          </div>
        )}
        {isExpanded
          ? currentNodeNode.children.map((item, idx) => {
              return (
                <div className="ml-2" key={idx}>
                  <View tree={tree} nodeId={item} insertNode={insertNode} />
                </div>
              );
            })
          : null}
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex"
        onMouseEnter={(e) => setShowUtility(true)}
        onMouseLeave={(e) => setShowUtility(false)}
      >
        <span>🗄️</span>
        <span>{currentNodeNode.name}</span>
        {showUtility ? (
          <div className="flex">
            <button onClick={() => handleDelete()}>🗑️</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TreeExp = () => {
  const [exp, setExp] = useState(data);

  const insertNode = (nodeId, name, isFolder) => {
    const newNodeId = new Date().getTime().toString();
    const newItem = {
      id: newNodeId,
      name,
      isFolder,
      parent: nodeId,
      children: [],
    };

    setExp((prev) => {
      const prevCopy = { ...prev };
      prevCopy[newNodeId] = newItem;
      const parentNode = { ...prevCopy[nodeId] };
      parentNode.children = [newNodeId, ...parentNode.children];
      prevCopy[nodeId] = parentNode;
      return prevCopy;
    });
  };

  return (
    <div>
      <View tree={exp} insertNode={insertNode} />
    </div>
  );
};

export default TreeExp;
