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
    click(e) {
      const wps = control
        .getPlan()
        .getWaypoints()
        .filter(wp => wp.latLng); //bo may wps bi null ma no tu seet amc dinh neu minh ko set 2 cai wp ban dau cho no
      control.getPlan().setWaypoints(wps);
      // console.log("old", rounting.getPlan().getWaypoints());
      if (control.getPlan().getWaypoints().length >= 6) return;
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
