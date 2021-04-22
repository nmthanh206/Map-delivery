import { useMapEvents } from "react-leaflet";
import { control } from "../Map";

const MyLocation = ({ setPoints }) => {
  const map = useMapEvents({
    locationfound(e) {
      console.count("Chay");
      control.getPlan().setWaypoints([e.latlng]); //Co getPlan thì sẽ add vô map
      //   rounting.addTo(map);      Tim Duong
      map.flyTo(e.latlng, map.getZoom());
      setPoints([[e.latlng.lat, e.latlng.lng]]);
    },
  });

  return null;
};

export default MyLocation;
