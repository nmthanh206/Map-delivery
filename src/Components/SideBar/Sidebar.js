import React from "react";
import LocationDetail from "./LocationDetail";
import "./Sidebar.css";
import { v4 as uuidv4 } from "uuid";
const SideBar = ({ points, map }) => {
  const listLocationDetails = points.map((point, i) => {
    return <LocationDetail key={uuidv4()} map={map} latlng={point} />;
  });
  console.log(listLocationDetails);
  return (
    <div className="SupportToolsArea">
      <form>
        <h4>LOCATION IN JOURNEY:</h4>
        <div className="box"> {listLocationDetails}</div>
        <input type="button" value="START" id="Start" className="button" />
      </form>
    </div>
  );
};

export default SideBar;
