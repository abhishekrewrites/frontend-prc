import { useCallback, useMemo, useState } from "react";
import { useTodoListUtility, FILTER_LABELS } from "./useTodoListUtility";

function TodoList() {
  const { itemsId, items, addItems, deleteItems, editItems, reorderItems } =
    useTodoListUtility();
  const [filter, setFilter] = useState("all");
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (e.key === "Enter" && e.target.value) {
        addItems(e.target.value);
        e.target.value = "";
      }
    },
    [addItems]
  ); // ✅ Added missing dependency

  const filteredIds = useMemo(() => {
    if (!itemsId.length || items.size === 0) return [];
    const gg = itemsId.filter((id) => {
      const item = items.get(id);
      if (!item) return false;
      if (filter === "all") return true;
      return filter === "active" ? !item.isCompleted : item.isCompleted;
    });

    return gg;
  }, [itemsId, items, filter]);

  const handleDragStart = useCallback((e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e, dropIndex) => {
      e.preventDefault();
      const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));

      if (dragIndex !== dropIndex && dragIndex !== null) {
        console.log(
          `Dropped item from index ${dragIndex} to index ${dropIndex}`
        );

        // Reorder the filtered items
        const newFilteredIds = Array.from(filteredIds);
        const [draggedItem] = newFilteredIds.splice(dragIndex, 1);
        newFilteredIds.splice(dropIndex, 0, draggedItem);

        // Update the main itemsId array to reflect the new order
        // This is more complex when filtering is involved
        reorderFilteredItems(dragIndex, dropIndex);
      }

      setDraggedIndex(null);
    },
    [filteredIds, reorderItems]
  );

  const reorderFilteredItems = (sourceIndex, destinationIndex) => {
    // Create a new order based on filtered items
    const newFilteredIds = Array.from(filteredIds);
    const [draggedItem] = newFilteredIds.splice(sourceIndex, 1);
    newFilteredIds.splice(destinationIndex, 0, draggedItem);

    // Find the positions in the original itemsId array
    const newItemsId = itemsId.map((id) => {
      const filteredIndex = newFilteredIds.indexOf(id);
      return filteredIndex !== -1
        ? { id, order: filteredIndex }
        : { id, order: Infinity };
    });

    // Sort to maintain the new order while keeping non-filtered items in place
    newItemsId.sort((a, b) => {
      if (a.order === Infinity && b.order === Infinity) return 0;
      if (a.order === Infinity) return 1;
      if (b.order === Infinity) return -1;
      return a.order - b.order;
    });

    // Update the state (you'll need to add this to your utility hook)
    const reorderedIds = newItemsId.map((item) => item.id);
    // For now, let's use a simpler approach
    reorderItems(sourceIndex, destinationIndex);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <input
        onKeyDown={handleKeyDown}
        className="rounded-md w-[400px] h-[40px] border border-s-violet-500 p-2"
      />

      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        {FILTER_LABELS.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="w-full">
        {filteredIds.map((it, idx) => (
          <Notes
            currentItemId={it}
            key={it}
            allItems={items}
            index={idx}
            handleDelete={deleteItems}
            editItems={editItems}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragging={draggedIndex === idx}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;

function Notes({
  currentItemId,
  allItems,
  handleDelete,
  editItems,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}) {
  const currentItem = allItems.get(currentItemId);

  if (!currentItem) return null;

  return (
    <div
      className={`flex mt-4 border border-indigo-700 rounded-md p-2 ${
        isDragging ? "opacity-50" : ""
      }`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
    >
      <div className="flex flex-col flex-1">
        <div className={`${currentItem.isCompleted ? "line-through" : ""}`}>
          {currentItem.name}
        </div>
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            id={`checkbox-${currentItemId}`}
            name="is-complete"
            className="flex mr-2"
            checked={currentItem.isCompleted}
            onChange={(e) => {
              editItems(currentItemId, {
                ...currentItem,
                isCompleted: e.target.checked,
              });
            }}
          />
          <label htmlFor={`checkbox-${currentItemId}`}>Completed</label>
        </div>
      </div>
      <div
        className="cursor-pointer ml-2"
        onClick={() => handleDelete(currentItemId)}
      >
        🗑️
      </div>
    </div>
  );
}
