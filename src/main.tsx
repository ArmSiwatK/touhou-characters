import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GridBackground from "./components/GridBackground/GridBackground";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <GridBackground />
  </React.StrictMode>
);
