import React, { useState, useEffect } from "react";
import { getAddress } from "../../Ulti/getAddress";
import { address } from "../../Ulti/address";
const LocationDetail = ({ point, map, add }) => {
  //  console.log(point, name);
  // const add = address.data.find(
  //   add => JSON.stringify(add.point) === JSON.stringify(point)
  // );
  // console.log("NAME NE", add);
  // const [name, setName] = useState(add ? add.name : "");
  console.log("ADDDDDDDDDDDDD", add);
  const [name, setName] = useState(add);
  console.log("NAMWWW", name);
  console.log("LocationDetail Run");
  useEffect(() => {
    console.log("NAME CO MA ", name);
    if (name !== "") {
      console.log("tra ve ne");
      return;
    }
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
        address.data = [
          ...address.data,
          { po: point, add: res.data.display_name },
        ];
        console.log(address);
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
