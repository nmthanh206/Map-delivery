import { getMatrix } from "./Ulti/getMatrix";

function getDistance(origin, destination) {
  // return distance in meters
  const lon1 = toRadian(origin[1]);
  const lat1 = toRadian(origin[0]);
  const lon2 = toRadian(destination[1]);
  const lat2 = toRadian(destination[0]);

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a =
    Math.pow(Math.sin(deltaLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
  return (degree * Math.PI) / 180;
}

const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

// const costMatrix = [
//   [0, 1, 3, 4],
//   [1, 0, 2, 3],
//   [3, 2, 0, 5],
//   [4, 3, 5, 0],
// ];
// const result2 = permutator([0, 1, 2, 3]);
//console.log(result2.map(x=>[0,...x]));
// const newArrays = result2.map(x => ["vi tri", ...x]);
// for (let oneArray of newArrays) console.log(oneArray);

//console.log(result2);

// async function SolveSTP2() {
//   let min = Infinity;
//   let index = 0;
//   let pathCost = 0;
//   for (let i = 0; i < result2.length; i++) {
//     pathCost = 0;
//     for (let j = 0; j < result2[i].length - 1; j++) {
//       let from = result2[i][j];
//       let to = result2[i][j + 1];
//       pathCost += costMatrix[from][to];
//     }
//     if (pathCost < min) {
//       min = pathCost;
//       index = i;
//     }
//   }
//   return [result2[index], min];
// }
// const Solve = async () => {
//   const result = await SolveSTP2();
//   console.log(result);
// };

// Solve();
// console.log("Tao truoc ne");

async function SolveSTP(control) {
  const wps = control
    .getPlan()
    .getWaypoints()
    .filter(wp => wp.latLng); //bo may wps bi null ma no tu seet amc dinh neu minh ko set 2 cai wp ban dau cho no
  control.getPlan().setWaypoints(wps);
  const pointsArray = control
    .getPlan()
    .getWaypoints()
    .map(({ latLng }) => [latLng.lat, latLng.lng]);
  const costMatrix = getMatrix(pointsArray);
  const result2 = permutator(Array.from(Array(pointsArray.length).keys()));
  let min = Infinity;
  let index = 0;
  let pathCost = 0;
  for (let i = 0; i < result2.length; i++) {
    pathCost = 0;
    for (let j = 0; j < result2[i].length - 1; j++) {
      let from = result2[i][j];
      let to = result2[i][j + 1];
      pathCost += costMatrix[from][to];
    }
    if (pathCost < min) {
      min = pathCost;
      index = i;
    }
  }
  return [result2[index], min];
}
export const SolveSTP2 = async control => {
  const result = await SolveSTP(control);
  console.log(result);
};
