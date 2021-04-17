import React from "react";
import L from "leaflet";
import { useMapEvents } from "react-leaflet";
import { control } from "../Map";
import { useRounting } from "../Map";
const MyLocation = () => {
  // const rounting = useRounting();
  // console.log(rounting);
  const map = useMapEvents({
    locationfound(e) {
      console.count("Chay");
      control.getPlan().setWaypoints([e.latlng]).addTo(map); //Co getPlan thì sẽ add vô map
      //   rounting.addTo(map);      Tim Duong
      map.flyTo(e.latlng, map.getZoom());
    },
    click(e) {
      // console.log("old", rounting.getPlan().getWaypoints());

      const wPs = control
        .getPlan()
        .getWaypoints()
        .map(wp => wp.latLng);
      // map.removeControl(rounting);
      setTimeout(() => {
        control.getPlan().setWaypoints([...wPs, e.latlng]);
        console.log(control.getPlan().getWaypoints());
      }, 100);
      // rounting.getPlan().setWaypoints([...wPs, e.latlng]);
      // .addTo(map);
    },
  });

  return null;
};

export default MyLocation;
