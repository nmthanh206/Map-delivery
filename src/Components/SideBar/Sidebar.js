import React from "react";
import LocationDetail from "./LocationDetail";
import "./Sidebar.css";
import { SolveSTP2 } from "../../Ulti/solveSTP2";
import { v4 as uuidv4 } from "uuid";
const SideBar = ({ points, map, control, setPoints }) => {
  const listLocationDetails = points.map((point, i) => {
    return <LocationDetail key={uuidv4()} map={map} latlng={point} />;
  });
  console.log(listLocationDetails);
  return (
    <div className="SupportToolsArea">
      <form>
        <h4>LOCATION IN JOURNEY:</h4>
        <div className="box"> {listLocationDetails}</div>
        {/* <input  type="button" value="START" id="Start" className="button" /> */}
        <div className="slidebar-container">
          <button
            onClick={e => {
              e.preventDefault();
              SolveSTP2(control, map);
            }}
            className="btn btn-find"
          >
            Find Route
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              control.hide();
              control.getPlan().setWaypoints([null]);
              setPoints([null]);
            }}
            className="btn btn-clear"
          >
            Clear Points
          </button>
        </div>
      </form>
    </div>
  );
};

export default SideBar;
