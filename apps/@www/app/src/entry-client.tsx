import ReactDOM from "react-dom/client";
import "./index.css";

import "../font/din-1451/DINEngschriftStd.woff";
import "../font/din-1451/DINMittelschriftStd.woff";

import { Routes } from "./routes";

import { BrowserRouter } from "react-router-dom";
import { PostHogProvider } from "posthog-js/react";

const posthogOptions = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
} as const;

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <PostHogProvider
    apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
    options={posthogOptions}
  >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </PostHogProvider>
);
