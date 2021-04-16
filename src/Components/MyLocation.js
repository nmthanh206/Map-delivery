import React from "react";
import L from "leaflet";
import { useMapEvents } from "react-leaflet";

import { useRounting } from "../Map";
const MyLocation = () => {
  const rounting = useRounting();
  console.log(rounting);
  const map = useMapEvents({
    locationfound(e) {
      console.count("Chay");
      rounting.getPlan().setWaypoints([e.latlng]).addTo(map); //Co getPlan thì sẽ add vô map
      //   rounting.addTo(map);      Tim Duong
      map.flyTo(e.latlng, map.getZoom());
    },
    click(e) {
      // console.log("old", rounting.getPlan().getWaypoints());
      console.log(rounting.getPlan().getWaypoints(), e);
      const wPs = rounting
        .getPlan()
        .getWaypoints()
        .map(wp => wp.latLng);
      map.removeControl(rounting);
      rounting
        .getPlan()
        .setWaypoints([...wPs, e.latlng])
        .addTo(map);
    },
    // contextmenu(e) {
    //   console.log(e.currentTarget);
    //   const wPs = rounting
    //     .getPlan()
    //     .getWaypoints()
    //     .map(wp => wp.latLng);
    //   console.log("old", wPs);
    //   const newWps = wPs.filter(wp => {
    //     return JSON.stringify(wp) !== JSON.stringify(e.latlng);
    //   });
    //   console.log("new", newWps);
    //   rounting.getPlan().setWaypoints(newWps).addTo(map);
    // },
  });

  return null;
};

export default MyLocation;
