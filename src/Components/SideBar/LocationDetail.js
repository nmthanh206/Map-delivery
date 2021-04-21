import React, { useState, useEffect } from "react";
import { getAddress } from "../../Ulti/getAddress";
const LocationDetail = ({ latlng, map }) => {
  //  console.log(latlng, name);
  const [name, setName] = useState("");
  useEffect(() => {
    let isCancelled = false;
    if (!latlng) return;
    console.log("useEffect run");
    getAddress(latlng[0], latlng[1]).then(res => {
      if (!isCancelled) {
        if (!res) {
          setName("Không có mạng !!");
          return;
        }
        console.log(res.data);
        setName(res.data.display_name);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [latlng]);
  return latlng ? (
    <div
      className="detail-location"
      onClick={() => map.flyTo(latlng, map.getZoom())}
    >
      <div className="detail-address">{name}</div>
    </div>
  ) : null;
};

export default LocationDetail;
