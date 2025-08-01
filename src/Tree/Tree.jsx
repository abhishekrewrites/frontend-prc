import initialExplorerData from "./data.json";
import FileExplorer from "./FileExplorer";
import useScalableFileExplorer from "./useScalableFileExplorer";

function Tree() {
  const { nodes, rootId, insertNode, deleteNode } =
    useScalableFileExplorer(initialExplorerData);

  return (
    <div className="">
      <FileExplorer
        nodeId={rootId}
        allNodes={nodes}
        handleInsertNode={insertNode}
        handleDeleteNode={deleteNode}
      />
    </div>
  );
}

export default Tree;
