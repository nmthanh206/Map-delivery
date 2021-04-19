import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import MyLocation from "./Components/MyLocation";
import { control } from "./Map";
import SideBar from "./Components/SideBar/Sidebar";
import { SolveSTP2 } from "./test2";
import searchBarLeft from "./Components/Search/SearchLeft";
import searchBarCenter from "./Components/Search/SearchCenter.js";
import AddClickEventMap from "./Components/AddClickEventMap";
import { createMarker } from "./Map";
const ps = [
  [10.841172501968856, 106.75928732628947],
  [10.847944564456817, 106.76160644370741],
  [10.847944364456817, 106.76160644370741],
  [10.847944562456817, 106.76160644370741],
  [10.827944564456817, 106.76150644370741],
];

const costMatrix = [
  [0, 1, 3, 4],
  [1, 0, 2, 3],
  [3, 2, 0, 5],
  [4, 3, 5, 0],
];

const wp = control
  .getPlan()
  .getWaypoints()
  .map(({ latLng }) => [latLng.lat, latLng.lng]);
function App() {
  const position = [10.841172501968856, 106.75928730628947];
  const [map, setMap] = useState(null);
  const [points, setPoints] = useState(wp);

  return (
    <>
      <button
        onClick={() => {
          // console.log(map.getBounds());
          SolveSTP2(control, map);

          // const wps = control
          //   .getPlan()
          //   .getWaypoints()
          //   .filter(wp => wp.latLng); //bo may wps bi null ma no tu seet amc dinh neu minh ko set 2 cai wp ban dau cho no
          // control.getPlan().setWaypoints(wps);
          // control.addTo(map);
          // control.route();
          // console.log(control.getRouter());
          // control.show(); //show chi duong chi tiet
        }}
        style={{ position: "absolute", top: "2px" }}
      >
        Find Route
      </button>
      <button
        onClick={() => {
          control.hide();
          control.getPlan().setWaypoints(null);
          setPoints([[]]);
        }}
        style={{ position: "absolute", top: "2px", left: "100px" }}
      >
        Clear Points
      </button>
      <div className="map-bar">
        {/* <SideBar /> */}
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          whenCreated={map => {
            setMap(map);
            control.addTo(map);
            control.hide(); //show chi duong chi tiet
            map.addControl(searchBarLeft);
            searchBarLeft.on("results", data => {
              if (data.results.length !== 1) return;
              const points = control
                .getPlan()
                .getWaypoints()
                .map(({ latLng }) => [latLng.lat, latLng.lng]);
              control
                .getPlan()
                .setWaypoints([...points, [data.latlng.lat, data.latlng.lng]]);
            });
            map.addControl(searchBarCenter);
            control.getPlan().options.createMarker = createMarker(setPoints);
            // map.locate();
          }}
        >
          {/* <MyLocation /> */}
          <AddClickEventMap points={points} setPoints={setPoints} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <SideBar points={points} map={map} />
      </div>
    </>
  );
}

export default App;
