import { useState } from "react";
import { FolderIcon, FileIcon, ArrowIcon } from "./Icons";

function FileExplorer({
  nodeId,
  allNodes,
  handleInsertNode,
  handleDeleteNode,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const currentNode = allNodes[nodeId];

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleNewItemClick = (e, isFolder) => {
    e.stopPropagation();
    setIsExpanded(true);
    setShowInput({ visible: true, isFolder });
  };

  const handleAddItem = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(currentNode.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleDeleteClick = (e, nodeIdToDelete) => {
    e.stopPropagation();
    handleDeleteNode(nodeIdToDelete);
  };

  if (currentNode.isFolder) {
    return (
      <div className="mt-1">
        <div
          onClick={handleToggle}
          className="flex items-center w-[400px] justify-between p-1.5 cursor-pointer hover:bg-gray-400 rounded-md group"
        >
          <div className="flex items-center">
            <ArrowIcon isExpanded={isExpanded} />
            <FolderIcon />
            <span>{currentNode.name}</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <button
              onClick={(e) => handleNewItemClick(e, true)}
              className="text-sm hover:text-yellow-400"
            >
              📁+
            </button>
            <button
              onClick={(e) => handleNewItemClick(e, false)}
              className="text-sm hover:text-blue-400"
            >
              📄+
            </button>
            <button
              onClick={(e) => handleDeleteClick(e, currentNode.id)}
              className="text-sm hover:text-red-500"
            >
              🗑️
            </button>
          </div>
        </div>

        <div
          style={{ display: isExpanded ? "block" : "none" }}
          className="pl-6 border-l-2 border-gray-700 ml-2"
        >
          {showInput.visible && (
            <div className="flex items-center gap-2 p-1">
              {showInput.isFolder ? <FolderIcon /> : <FileIcon />}
              <input
                type="text"
                autoFocus
                onKeyDown={handleAddItem}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="bg-gray-700 text-white text-sm rounded px-1 outline-none w-full"
              />
            </div>
          )}

          {currentNode.children.map((childId) => (
            <FileExplorer
              key={childId}
              nodeId={childId}
              allNodes={allNodes}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-1.5 pl-8 group">
      <div className="flex items-center">
        <FileIcon />
        <span>{currentNode.name}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => handleDeleteClick(e, currentNode.id)}
          className="text-sm hover:text-red-500"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default FileExplorer;
