import { useState } from "react";

function flattenTree(tree) {
  let flatData = {};

  function recurse(node, parentId) {
    const { items, ...rest } = node;

    flatData[node.id] = {
      ...rest,
      parent: parentId,
      children: items.map((c) => c.id),
    };
    items.forEach((e) => recurse(e, node.id));
  }

  recurse(tree);

  return flatData;
}

const useKHooks = () => {
  const { node, setNode } = useState(tree);

  const insertNode = (folderId, name, isFolder) => {
    const newNodeID = new Date().getTime().toString();
    const newNode = {
      nodeId: newNodeID,
      name,
      isFolder,
      parent: folderId,
      children: [],
    };

    setNode((prv) => {
      const newNodes = { ...prv };
      newNodes[newNodeID] = newNode;

      const parent = { ...newNodes[folderId] };
      parent.children = [newNodeID, parent.children];
      newNodes[folderId] = parent;
      return newNodes;
    });
  };
};
