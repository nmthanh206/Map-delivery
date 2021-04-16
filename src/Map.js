import React, { useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";

const RoutingContext = React.createContext();

export const control = L.Routing.control({
  waypoints: [
    L.latLng(10.841172501968856, 106.75928730628947),
    L.latLng(10.847944564456817, 106.76160644370741),
  ],
  routeWhileDragging: true,
  showAlternatives: true,

  altLineOptions: {
    styles: [
      { color: "black", opacity: 0.15, weight: 9 },
      { color: "white", opacity: 0.8, weight: 6 },
      { color: "blue", opacity: 0.5, weight: 2 },
    ],
  },
  router: new L.Routing.OSRMv1({
    serviceUrl: "//router.project-osrm.org/viaroute",
  }),
  createMarker: function (i, wps, n) {
    console.log(wps);
    const marker = L.marker(wps.latLng, {
      draggable: true,
      bounceOnAdd: true,
      bounceOnAddOptions: {
        duration: 1000,
        height: 800,
      },
    })
      .bindPopup("My location")
      .openPopup()
      .on("contextmenu", e => {
        const waypoints = control
          .getPlan()
          .getWaypoints()
          .map(wp => wp.latLng);
        const newWaypoints = waypoints.filter(
          wp => JSON.stringify(wp) !== JSON.stringify(e.latlng)
        );
        control.getPlan().setWaypoints(newWaypoints);
      });

    return marker;
  },
});
export function useRounting() {
  return useContext(RoutingContext);
}

const Map = ({ children }) => {
  return (
    <RoutingContext.Provider value={control}>
      {children}
    </RoutingContext.Provider>
  );
};

export default Map;