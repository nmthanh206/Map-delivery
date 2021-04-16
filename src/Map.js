import React, { useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";

const RoutingContext = React.createContext();
const control = L.Routing.control({
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
  createMarker: function (i, waypoints, n) {
    console.log(waypoints);
    const marker = L.marker(waypoints.latLng, {
      draggable: true,
      bounceOnAdd: true,
      bounceOnAddOptions: {
        duration: 1000,
        height: 800,
      },
    })
      .bindPopup("My location")
      .openPopup();
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
