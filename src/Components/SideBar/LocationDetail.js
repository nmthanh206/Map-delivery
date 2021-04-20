import React, { useState, useEffect } from "react";
import { getAddress } from "../../Ulti/getAddress";
const LocationDetail = ({ latlng, map }) => {
  //  console.log(latlng, name);
  const [name, setName] = useState("");
  useEffect(() => {
    if (latlng.length === 0) return;
    console.log("useEffect run");
    getAddress(latlng[0], latlng[1]).then(res => {
      if (!res) {
        setName("Không có mạng !!");
        return;
      }
      console.log(res.data);
      setName(res.data.display_name);
    });
  }, [latlng]);
  return latlng.length ? (
    <div
      className="detail-location"
      onClick={() => map.flyTo(latlng, map.getZoom())}
    >
      <div className="detail-address">{name}</div>
    </div>
  ) : null;
};

export default LocationDetail;
