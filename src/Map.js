import React from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { getAddress } from "./Ulti/getAddress";

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
  routeWhileDragging: true,
  showAlternatives: true,
  addWaypoints: true,
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

  // createMarker: function (index, wps, n) {
  //   // console.log(wps);

  //   const marker = L.marker(wps.latLng, {
  //     draggable: true,
  //     bounceOnAdd: true,
  //     bounceOnAddOptions: {
  //       duration: 1000,
  //       height: 800,
  //     },
  //   })
  //     .bindPopup(() => {
  //       //    console.log(marker.getLatLng(), wps.latLng);
  //       // if (
  //       //   !marker.getPopup() &&
  //       //   JSON.stringify(marker.getLatLng()) === JSON.stringify(wps.latLng)
  //       // )
  //       //   return marker.getPopup();
  //       getAddress(wps.latLng.lat, wps.latLng.lng).then(res => {
  //         console.log(res);
  //         marker.bindPopup(res.data.display_name);
  //       });
  //       return "";
  //     })
  //     .openPopup()
  //     .on("contextmenu", e => {
  //       const waypoints = control
  //         .getPlan()
  //         .getWaypoints()
  //         .map(wp => wp.latLng);
  //       const newWaypoints = waypoints.filter(
  //         wp => JSON.stringify(wp) !== JSON.stringify(e.latlng)
  //       );
  //       control.getPlan().setWaypoints(newWaypoints);
  //       //  control.spliceWaypoints(index, index + 1);
  //     })
  //     .on("dragend", () => {
  //       getAddress(wps.latLng.lat, wps.latLng.lng).then(res => {
  //         console.log(res);
  //         marker.bindPopup(res.data.display_name);
  //       });
  //     });

  //   return marker;
  // },
}).on("routesfound", function (e) {
  const distance = e.routes[0].summary.totalDistance;
  console.log("routing distance: " + distance);
});

export const createMarker = setPoints => {
  return (index, wps, n) => {
    const marker = L.marker(wps.latLng, {
      draggable: true,
      bounceOnAdd: true,
      // icon: L.icon({ iconUrl: "./my-icon.png", iconSize: [38, 95] }),
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
        const newWpArray = newWaypoints.map(wp => [wp.lat, wp.lng]);
        setPoints([...newWpArray]);
      })
      .on("dragend", () => {
        getAddress(wps.latLng.lat, wps.latLng.lng).then(res => {
          const waypoints = control
            .getPlan()
            .getWaypoints()
            .map(wp => [wp.latLng.lat, wp.latLng.lng]);
          console.log(waypoints);
          setPoints(waypoints);
          console.log(res);
          marker.bindPopup(res.data.display_name);
        });
      });

    return marker;
  };
};
