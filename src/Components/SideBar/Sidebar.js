import React from "react";
import LocationDetail from "./LocationDetail";
import "./Sidebar.css";
import { SolveSTP2 } from "../../Ulti/solveSTP2";
import { v4 as uuidv4 } from "uuid";
const SideBar = ({ points, map, control, setPoints }) => {
  const listLocationDetails = points.map((point, i) => {
    return point ? (
      <div key={uuidv4()} className="container-box">
        <h1>{i}</h1>
        <LocationDetail map={map} point={point} />
      </div>
    ) : null;
  });
  console.log(listLocationDetails);
  return (
    <div className="SupportToolsArea">
      <form>
        <h4 style={{ margin: "2rem auto", display: "inline-block" }}>
          LOCATION IN JOURNEY:
        </h4>
        <div className="box"> {listLocationDetails}</div>
        {/* <input  type="button" value="START" id="Start" className="button" /> */}
        <div className="slidebar-container">
          <button
            onClick={e => {
              e.preventDefault();
              SolveSTP2(control, setPoints);
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
              setPoints([]);
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
