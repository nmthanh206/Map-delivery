import React, { useState, useEffect } from "react";
import { getAddress } from "../../Ulti/getAddress";
const LocationDetail = ({ latlng, map }) => {
  //  console.log(latlng, name);
  const [name, setName] = useState("");
  useEffect(() => {
    if (latlng.length === 0) return;
    console.log("useEffect run");
    getAddress(latlng[0], latlng[1]).then(res => {
      console.log(res.data.display_name);
      setName(res.data.display_name);
    });
  }, [latlng]);
  return latlng.length ? (
    <div
      className="detail-location"
      onClick={() => map.flyTo(latlng, map.getZoom())}
    >
      <div>{`lat: ${latlng[0].toFixed(6)} 
       lng: ${latlng[1].toFixed(6)}`}</div>
      <div>{name}</div>
    </div>
  ) : null;
};

export default LocationDetail;
