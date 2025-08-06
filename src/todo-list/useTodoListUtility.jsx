import { useState } from "react";

export const FILTER_LABELS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export const useTodoListUtility = () => {
  const [itemsId, setItemsId] = useState([]);
  const [items, setItems] = useState(new Map());

  const addItems = (name) => {
    const newItemId = new Date().getTime().toString();
    const newItem = {
      id: newItemId,
      name: name,
      isCompleted: false,
      desription: "",
    };

    setItems((prev) => {
      const newMap = new Map(prev);
      newMap.set(newItemId, newItem);
      return newMap;
    });
    setItemsId((prev) => [...prev, newItemId]);
  };

  const editItems = (id, node) => {
    setItems((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, node);
      return newMap;
    });
  };

  const deleteItems = (id) => {
    setItems((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });

    setItemsId((prev) => {
      const newItemsIds = [...prev];
      return newItemsIds.filter((it) => it !== id);
    });
  };

  return { itemsId, items, addItems, editItems, deleteItems };
};
