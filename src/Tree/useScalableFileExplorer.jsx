import { useState, useCallback } from "react";

const flattenTree = (tree) => {
  const flatData = {};

  function recurse(node, parentId = null) {
    const { items, ...rest } = node;
    flatData[node.id] = {
      ...rest,
      parent: parentId,
      children: items.map((item) => item.id),
    };
    items.forEach((item) => recurse(item, node.id));
  }

  recurse(tree);
  return flatData;
};

const useScalableFileExplorer = (initialTree) => {
  const [nodes, setNodes] = useState(() => flattenTree(initialTree));

  const insertNode = useCallback((folderId, name, isFolder) => {
    const newNodeId = new Date().getTime().toString();
    const newNode = {
      id: newNodeId,
      name,
      isFolder,
      parent: folderId,
      children: [],
    };

    setNodes((prevNodes) => {
      const newNodes = { ...prevNodes };

      newNodes[newNodeId] = newNode;

      const parentNode = { ...newNodes[folderId] };
      parentNode.children = [newNodeId, ...parentNode.children];

      newNodes[folderId] = parentNode;

      return newNodes;
    });
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((prevNodes) => {
      const newNodes = { ...prevNodes };
      const nodeToDelete = newNodes[nodeId];

      if (!nodeToDelete) return prevNodes;

      const parentId = nodeToDelete.parent;
      if (parentId) {
        const parentNode = { ...newNodes[parentId] };
        parentNode.children = parentNode.children.filter((id) => id !== nodeId);
        newNodes[parentId] = parentNode;
      }

      function deleteRecursively(id) {
        const node = newNodes[id];
        if (node.isFolder) {
          node.children.forEach(deleteRecursively);
        }
        delete newNodes[id];
      }

      deleteRecursively(nodeId);

      return newNodes;
    });
  }, []);

  return { nodes, rootId: initialTree.id, insertNode, deleteNode };
};

export default useScalableFileExplorer;
