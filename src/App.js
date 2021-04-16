import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import Map from "./Map";
import MyLocation from "./Components/MyLocation";
import { control } from "./Map";

function App() {
  const position = [10.841172501968856, 106.75928730628947];
  const [map, setMap] = useState(null);
  const [rounting, setRounting] = useState(null);

  return (
    <Map>
      <button
        onClick={() => control.addTo(map)}
        style={{ position: "absolute", top: "2px" }}
      >
        Find Route
      </button>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        whenCreated={map => {
          setMap(map);
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
