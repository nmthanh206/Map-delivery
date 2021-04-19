import React from "react";
import LocationDetail from "./LocationDetail";
import "./Sidebar.css";
import { getAddress } from "../../Ulti/getAddress";
const SideBar = ({ points, map }) => {
  const listLocationDetails = points.map((point, i) => {
    return <LocationDetail map={map} latlng={point} name={"culi"} />;
  });
  console.log(listLocationDetails);
  return (
    <div className="SupportToolsArea">
      <form>
        <h4>INPUT LOCATION:</h4>
        <input type="text" id="Location" />
        <input type="button" value="SAVE" id="Save" className="button" />
        <br />
        <br />
        <h4>LOCATION IN JOURNEY:</h4>
        {listLocationDetails}
        <input type="button" value="START" id="Start" className="button" />
      </form>
    </div>
  );
};

export default SideBar;
