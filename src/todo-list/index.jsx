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
  );

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
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;

function Notes({ currentItemId, allItems, handleDelete, editItems, index }) {
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
