import { useMapEvents } from "react-leaflet";
import { control } from "../Map";
const AddClickEventMap = ({ points, setPoints }) => {
  console.log("EventClick render !!");
  // const map = useMapEvents({})
  useMapEvents({
    click(e) {
      console.log("click");
      const wps = control
        .getPlan()
        .getWaypoints()
        .filter(wp => wp.latLng); //bo may wps bi null ma no tu set mac dinh neu minh ko set 2 cai wp ban dau cho no
      control.getPlan().setWaypoints(wps);
      // console.log("old", rounting.getPlan().getWaypoints());
      if (control.getPlan().getWaypoints().length >= 6) return;
      const wPs = control
        .getPlan()
        .getWaypoints()
        .map(wp => wp.latLng);
      // map.removeControl(rounting);
      setPoints([...points, [e.latlng.lat, e.latlng.lng]]);
      setTimeout(() => {
        control.getPlan().setWaypoints([...wPs, e.latlng]);
        console.log(control.getPlan().getWaypoints());
      }, 100);
    },
  });

  return null;
};

export default AddClickEventMap;
