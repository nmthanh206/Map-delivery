import React, { useState } from "react";
// import axios from "axios";
import MyLocation from "./Components/MyLocation";
import { control, createMarker } from "./Map";
import SideBar from "./Components/SideBar/Sidebar";
import searchBarLeft from "./Components/Search/SearchLeft";
import searchBarCenter from "./Components/Search/SearchCenter.js";
import AddClickEventMap from "./Components/AddClickEventMap";
// import { createMarker } from "./Map";
import { popupFormat } from "./Components/Search/SearchCenter";
import { getWayPointsArray } from "./Ulti/getWayPointsArray";
import MapSetUp from "./Components/Map/MapSetUp";

// "start": "set PORT=3006 && react-scripts start"
const wp = control
  .getPlan()
  .getWaypoints()
  .map(({ latLng }) => [latLng.lat, latLng.lng]);
let flag = true;
function App(props) {
  console.log("PATH NAME NE", +window.location.search.slice(4));

  const position = [10.841172501968856, 106.75928730628947];
  const [map, setMap] = useState(null);
  const [points, setPoints] = useState(wp);
  const setUpMap = map => {
    setMap(map);
    control.addTo(map);
    control.hide(); //show chi duong chi tiet
    map.addControl(searchBarLeft);
    searchBarLeft.on("results", data => {
      if (data.results.length !== 1) return;
      const wpsArray = getWayPointsArray(control);
      control
        .getPlan()
        .setWaypoints([...wpsArray, [data.latlng.lat, data.latlng.lng]]);
      setPoints([...wpsArray, [data.latlng.lat, data.latlng.lng]]);
    });
    map.addControl(searchBarCenter);
    searchBarCenter.options.popupFormat = popupFormat(setPoints);
    control.getPlan().options.createMarker = createMarker(setPoints);
    map.locate();
  };
  return (
    <>
      <div className="map-bar">
        <MapSetUp
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          whenCreated={setUpMap}
        >
          <MyLocation setPoints={setPoints} />
          <AddClickEventMap points={points} setPoints={setPoints} />
        </MapSetUp>
        <SideBar points={points} map={map} setPoints={setPoints}>
          <div
            className="toggle-btn"
            onClick={() => {
              if (flag) {
                control.hide();
                flag = false;
              } else {
                control.show();
                flag = true;
              }
            }}
          ></div>
        </SideBar>
      </div>
    </>
  );
}

export default App;
