import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Routes } from "./routes";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
