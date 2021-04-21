import React, { useState, useEffect } from "react";
import { getAddress } from "../../Ulti/getAddress";
const LocationDetail = ({ point, map }) => {
  //  console.log(point, name);
  const [name, setName] = useState("");
  useEffect(() => {
    let isCancelled = false;
    if (!point) return;
    console.log("useEffect run");
    // if (name) return;
    getAddress(point[0], point[1]).then(res => {
      if (!isCancelled) {
        if (!res) {
          setName("Không có mạng !!");
          return;
        }
        console.log(res.data);
        setName(res.data.display_name);
        console.log("Run Run run ");
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [point]);
  return point ? (
    <div
      className="detail-location"
      onClick={() =>
        map.flyTo(point, 17, {
          animate: true,
          duration: 1.5,
        })
      }
    >
      <h3 className="detail-address">{name}</h3>
    </div>
  ) : null;
};

export default LocationDetail;
