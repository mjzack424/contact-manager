import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode is a tool for highligting problems(it activate additional checks, only use for develop mode and for production it will be disable), is likr fragment
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
