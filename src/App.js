import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import MyLocation from "./Components/MyLocation";
import { control } from "./Map";
import SideBar from "./Components/SideBar/Sidebar";

function App() {
  const position = [10.841172501968856, 106.75928730628947];
  const [map, setMap] = useState(null);

  return (
    <>
      <button
        onClick={() => {
          const wps = control
            .getPlan()
            .getWaypoints()
            .filter(wp => wp.latLng); //bo may wps bi null ma no tu seet amc dinh neu minh ko set 2 cai wp ban dau cho no
          control.getPlan().setWaypoints(wps);
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
          control.hide();
          control.getPlan().setWaypoints(null);
          // const [wp1, wp2] = control.getPlan().getWaypoints();
          // control.getPlan().setWaypoints([wp1, wp2]);
        }}
        style={{ position: "absolute", top: "2px", left: "50px" }}
      >
        Clear Points
      </button>
      {/* <div className="map-bar"> */}
      {/* <SideBar /> */}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        whenCreated={map => {
          setMap(map);
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
      {/* </div> */}
    </>
  );
}

export default App;
