import React, { useState, useEffect } from "react";
import { getAddress } from "../../Ulti/getAddress";
import { address } from "../../Ulti/address";
const LocationDetail = ({ point, map, add }) => {
  const [name, setName] = useState(add);
  useEffect(() => {
    if (name) return;
    let isCancelled = false;
    if (!point) return;
    // console.log("useEffect run");
    getAddress(point[0], point[1]).then(res => {
      if (!isCancelled) {
        if (!res) {
          setName("Không có mạng !!");
          return;
        }
        console.log(res.data);
        address.data = [
          ...address.data,
          { po: point, add: res.data.display_name },
        ];
        console.log("ADDRESS hien co ne ", address);
        setName(res.data.display_name);
        // console.log("Run Run run ");
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [point, name]);
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
