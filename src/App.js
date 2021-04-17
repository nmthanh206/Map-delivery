import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import Map from "./Map";
import MyLocation from "./Components/MyLocation";
import { control } from "./Map";

function App() {
  const position = [10.841172501968856, 106.75928730628947];
  const [map, setMap] = useState(null);
  // const [rounting, setRounting] = useState(null);

  return (
    <Map>
      <button
        onClick={() => {
          map.removeControl(control);
          control.options.autoRoute = true;

          control.addTo(map);
          control.show(); //show chi duong chi tiet
        }}
        style={{ position: "absolute", top: "2px" }}
      >
        Find Route
      </button>
      <button
        onClick={() => {
          // const nWp = control.getPlan().getWaypoints().length;
          // control.spliceWaypoints(0, nWp);
          control.getPlan().setWaypoints(null);
        }}
        style={{ position: "absolute", top: "2px", left: "50px" }}
      >
        Clear Points
      </button>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        whenCreated={map => {
          setMap(map);
          // control.hide();
          control.addTo(map);
          control.hide(); //show chi duong chi tiet
          // map.locate();
        }}
      >
        <MyLocation />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Map>
  );
}

export default App;
