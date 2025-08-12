import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Pagination from "./Pagination/Pagination.jsx";
import Tree from "./Tree/Tree.jsx";
import TreeExp from "./demo/TreeExp.jsx";
import JsonViewer from "./JsonViewer";
import Appt from "./rahul-tree/app.jsx";
import Apt from "./multi-step-form/";
import QueueProgressBar from "./queue-progress-bar/";
import TodoList from "./todo-list";
import ShoppingCart from "./shopping-cart";
import Wrapper from "./data-table/";
import Green from "./green-reverse-grid/";
import Clocks from "./timers/";
import Home from "./rahul-json/";

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
        <Route path="queue-progress-bar" element={<QueueProgressBar />} />
        <Route path="tree-exp" element={<TreeExp />} />
        <Route path="todo-list" element={<TodoList />} />
        <Route path="shopping" element={<ShoppingCart />} />
        <Route path="data-table" element={<Wrapper />} />
        <Route path="green" element={<Green />} />
        <Route path="clock" element={<Clocks />} />
        <Route path="rahul-json" element={<Home />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
