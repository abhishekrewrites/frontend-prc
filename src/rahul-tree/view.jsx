import { useState } from "react";

const File = ({ label }) => {
  return <li>{label}</li>;
};

const Folder = ({ label, children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li>
      <div>
        <span onClick={handleClick}>{label}</span>
      </div>
      {open && children}
    </li>
  );
};

export const View = ({ data, setState }) => {
  const [type, setType] = useState(null);
  const [label, setLabel] = useState("");

  const handleInput = (e) => {
    setLabel(e.target.value);
  };

  const handleSubmit = () => {
    const newItem = {
      type: type,
      label: label,
      ...(type === "folder" && { children: [] }),
    };

    const updatedData = [...data, newItem];
    setState(updatedData);
    setType(null);
    setLabel("");
  };

  return (
    <ul className="flex">
      <div>
        <button onClick={() => setType("folder")}>+Folder</button>
        <button onClick={() => setType("file")}>+File</button>
      </div>

      {type && (
        <input
          className="flex border border-gray-500 rounded-md"
          onChange={handleInput}
          type="text"
        />
      )}
      {type && <button onClick={handleSubmit}>Add</button>}
      {data.map((d, index) => {
        if (d.type === "file") return <File key={index} label={d.label} />;
        else {
          return (
            <Folder key={index} label={d.label}>
              <View
                data={d.children}
                setState={(updatedChildren) => {
                  const newData = [...data];
                  newData[index] = {
                    ...newData[index],
                    children: updatedChildren,
                  };
                  setState(newData);
                }}
              />
            </Folder>
          );
        }
      })}
    </ul>
  );
};
