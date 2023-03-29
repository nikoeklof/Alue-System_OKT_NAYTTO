import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Remember to include these two stylesheets for leaflet and leaflet-draw
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
