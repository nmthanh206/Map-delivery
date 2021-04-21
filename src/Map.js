import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { getAddress } from "./Ulti/getAddress";
import { getWayPointsArray } from "./Ulti/getWayPointsArray";
// import logo from "./location.jpg";
// router: new L.Routing.OSRMv1({
//   serviceUrl: "//router.project-osrm.org/viaroute",
// }),

//pk.eyJ1IjoiY3VsaSIsImEiOiJja25uZXU0ZDAweTdiMnZtb3M2NHQ5aTRyIn0.NRnVfIe8taalu9iDd4fGPw
export const control = L.Routing.control({
  waypoints: [
    L.latLng(10.841172501968856, 106.75928730628947),
    L.latLng(10.847944564456817, 106.76160644370741),
  ],
  show: false,
  showAlternatives: true,
  // addWaypoints: true,
  // routeDragTimeout: 250,
  routeWhileDragging: false,
  autoRoute: false,
  useZoomParameter: false,
  allowUTurns: false,
  // lineOptions: {
  //   styles: [{ className: "animate" }], // Adding animate class
  // },
  altLineOptions: {
    styles: [
      { color: "black", opacity: 0.15, weight: 9 },
      { color: "white", opacity: 0.8, weight: 6 },
      { color: "blue", opacity: 0.5, weight: 2 },
    ],
  },
}).on("routesfound", function (e) {
  const distance = e.routes[0].summary.totalDistance;
  console.log("routing distance: " + distance);
});
// const customIcon = {
//   iconUrl: logo,
//   iconSize: [38, 95],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//   shadowSize: [68, 95],
//   shadowAnchor: [22, 94],
// };
export const createMarker = setPoints => {
  return (index, wps, n) => {
    const marker = L.marker(wps.latLng, {
      draggable: true,
      bounceOnAdd: true,
      // icon: L.icon(customIcon),
      bounceOnAddOptions: {
        duration: 1000,
        height: 800,
      },
    })
      .bindPopup(() => {
        getAddress(wps.latLng.lat, wps.latLng.lng).then(res => {
          console.log(res);
          marker.bindPopup(res.data.display_name);
        });
        return "";
      })
      .openPopup()
      .on("contextmenu", e => {
        console.log("contextmenu");
        const waypoints = control
          .getPlan()
          .getWaypoints()
          .map(wp => wp.latLng);
        const newWaypoints = waypoints.filter(
          wp => JSON.stringify(wp) !== JSON.stringify(e.latlng)
        );
        control.getPlan().setWaypoints(newWaypoints);
        if (!newWaypoints[0]) {
          setPoints([...newWaypoints]);
          return;
        }
        console.log(newWaypoints);
        const newWpArray = newWaypoints.map(wp => [wp.lat, wp.lng]);
        setPoints([...newWpArray]);
      })
      .on("dragend", () => {
        getAddress(wps.latLng.lat, wps.latLng.lng).then(res => {
          const waypoints = getWayPointsArray(control);
          console.log(waypoints);
          setPoints(waypoints);
          console.log(res);
          marker.bindPopup(res.data.display_name);
        });
      });

    return marker;
  };
};
