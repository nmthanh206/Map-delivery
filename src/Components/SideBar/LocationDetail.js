import React, { useState, useEffect } from "react";
import { getAddress } from "../../Ulti/getAddress";
import { address } from "../../Ulti/address";
const LocationDetail = ({ point, map }) => {
  //  console.log(point, name);
  const add = address.data.find(
    add => JSON.stringify(add.point) === JSON.stringify(point)
  );
  console.log("NAME NE", add);
  const [name, setName] = useState(add ? add.name : "");
  useEffect(() => {
    if (name) return;
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
        address.data = [
          ...address.data,
          { point: point, add: res.data.display_name },
        ];
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
