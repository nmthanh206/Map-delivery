import React from "react";
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
  });

  return null;
};

export default MyLocation;
