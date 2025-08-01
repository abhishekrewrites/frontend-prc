import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Pagination from "./Pagination/Pagination.jsx";
import Tree from "./Tree/Tree.jsx";
import JsonViewer from "./JsonViewer";
import Appt from "./rahul-tree/app.jsx";
import Apt from "./multi-step-form/";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="pagination" element={<Pagination />} />
        <Route path="tree" element={<Tree />} />
        <Route path="json-viewer" element={<JsonViewer />} />
        <Route path="rahul-tree" element={<Appt />} />
        <Route path="multi-step-form" element={<Apt />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
