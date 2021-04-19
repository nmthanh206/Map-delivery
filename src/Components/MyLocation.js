import { useMapEvents } from "react-leaflet";
import { control } from "../Map";
const MyLocation = () => {
  const map = useMapEvents({
    locationfound(e) {
      console.count("Chay");
      control.getPlan().setWaypoints([e.latlng]).addTo(map); //Co getPlan thì sẽ add vô map
      //   rounting.addTo(map);      Tim Duong
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
};

export default MyLocation;
