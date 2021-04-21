import L from "leaflet";

const getDistance = (latlng1, latlng2) => {
  return L.latLng(latlng1).distanceTo(latlng2);
};
// function getDistance(origin, destination) {
//   // return distance in meters
//   const lon1 = toRadian(origin[1]);
//   const lat1 = toRadian(origin[0]);
//   const lon2 = toRadian(destination[1]);
//   const lat2 = toRadian(destination[0]);

//   const deltaLat = lat2 - lat1;
//   const deltaLon = lon2 - lon1;

//   const a =
//     Math.pow(Math.sin(deltaLat / 2), 2) +
//     Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
//   const c = 2 * Math.asin(Math.sqrt(a));
//   const EARTH_RADIUS = 6371;
//   return c * EARTH_RADIUS * 1000;
// }
// function toRadian(degree) {
//   return (degree * Math.PI) / 180;
// }
export const Matrix = (points, length = points.length) => {
  const pairPoints = [];
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      console.log(i, j);
      pairPoints.push[[i, j]];
    }
  }
  let l = 0;
  const matrix = new Array(length).fill(0).map(() => new Array(length).fill(0));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i == j) matrix[i].push(0);
      else {
        const [wp1, wp2] = pairPoints[l++];
        matrix[i].push(getDistance(points[wp1], points[wp2]));
      }
    }
  }
  return matrix;
};
