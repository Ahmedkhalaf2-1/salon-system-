import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/settings.css";
import "./styles/bookings.css";
import "./styles/cashier.css";
import "./styles/history.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);