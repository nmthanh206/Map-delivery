import axios from "axios";

import { Matrix } from "./test";
const costMatrix = [
  [0, 1, 3, 4],
  [1, 0, 2, 3],
  [3, 2, 0, 5],
  [4, 3, 5, 0],
];
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

export async function solveSTP(points = costMatrix, control, map) {
  try {
    const response = await axios.post(`http://localhost:3001/tsp`, {
      points: JSON.stringify(points),
    });
    const wps = control
      .getPlan()
      .getWaypoints()
      .filter(wp => wp.latLng); //bo may wps bi null ma no tu seet amc dinh neu minh ko set 2 cai wp ban dau cho no
    control.getPlan().setWaypoints(wps);
    console.log(
      control
        .getPlan()
        .getWaypoints()
        .map(({ latLng }) => [latLng.lat, latLng.lng])
    );
    const pointsArray = control
      .getPlan()
      .getWaypoints()
      .map(({ latLng }) => [latLng.lat, latLng.lng]);
    const matrix = Matrix(pointsArray);

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
