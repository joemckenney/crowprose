import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "../font/din-1451/DINEngschriftStd.woff";
import "../font/din-1451/DINMittelschriftStd.woff";

import { Routes } from "./routes";

import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
