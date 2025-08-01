import { useState } from "react";
import { View } from "./view";

const data = [
  {
    type: "folder",
    label: "folder1",
    children: [
      { type: "file", label: "file1" },
      {
        type: "folder",
        label: "folder2",
        children: [{ type: "file", label: "file2" }],
      },
    ],
  },
  { type: "file", label: "file3" },
];

const Appt = () => {
  const [state, setState] = useState(data);

  return (
    <div>
      <View data={state} setState={setState} />
    </div>
  );
};

export default Appt;
