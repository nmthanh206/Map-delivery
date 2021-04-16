import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet-geosearch/dist/geosearch.css";
import App from "./App";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);
