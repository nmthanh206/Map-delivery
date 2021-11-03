import axios from "axios";

import { getMatrix } from "./getMatrix";
// const costMatrix = [
//   [0, 1, 3, 4],
//   [1, 0, 2, 3],
//   [3, 2, 0, 5],
//   [4, 3, 5, 0],
// ];
// export async function solveSTP(points = costMatrix) {
//   try {
//     const response = await axios.post(`http://localhost:3001/tsp`, {
//       points: JSON.stringify(points),
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function solveSTP(points, control, map) {
  try {
    const response = await axios.post(`http://localhost:3001/tsp`, {
      points: JSON.stringify(points),
    });
    console.log("best route", response.data.result);
    // const wps = control
    //   .getPlan()
    //   .getWaypoints()
    //   .filter(wp => wp.latLng); //bo may wps bi null ma no tu seet amc dinh neu minh ko set 2 cai wp ban dau cho no
    // control.getPlan().setWaypoints(wps);
    const pointsArray = control
      .getPlan()
      .getWaypoints()
      .map(({ latLng }) => [latLng.lat, latLng.lng]);
    const matrix = getMatrix(pointsArray);
    const oldwp = control
      .getPlan()
      .getWaypoints()
      .map(({ latLng }) => [latLng.lat, latLng.lng]);

    console.log("old wp", oldwp);
    const newwp = new Array(oldwp.length).fill(0);
    let i = 0;
    for (let i = 0; i < oldwp.length; i++) {
      console.log(oldwp[response.data.result[i]]);
      newwp[i] = oldwp[response.data.result[i]];
    }
    console.log("toa do moi", newwp);
    control.getPlan().setWaypoints(newwp);
    map.removeControl(control);
    control.options.autoRoute = true;
    control.addTo(map);
    control.show(); //show chi duong chi tiet
    return response;
  } catch (error) {
    console.error(error);
  }
}
//  https://api.mapbox.com/directions-matrix/v1/mapbox/driving/106.76094174385072,10.843147966814454;106.76065206527711,10.845592606229866;106.75966501235962,10.845023597115608?approaches=curb;curb;curb&access_token=pk.eyJ1IjoiY3VsaSIsImEiOiJja25uZXU0ZDAweTdiMnZtb3M2NHQ5aTRyIn0.NRnVfIe8taalu9iDd4fGPw
