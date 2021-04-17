// const L = require("leaflet");

// const getDistance = (latlng1, latlng2) => {
//   return L.latLng(latlng1).distanceTo(latlng2);
// };
// const Matrix = (points, length = points.length) => {
//   const pairPoints = new Array(15).fill(0).map(() => new Array(2).fill(0));
//   let k = 0;
//   for (let i = 0; i < length; i++) {
//     for (let j = i + 1; j < length; j++) {
//       console.log(i, j);
//       pairPoints[k++] = [i, j];
//     }
//   }
//   let l = 0;
//   console.log(pairPoints);
//   const matrix = new Array(length).fill(0).map(() => new Array(length).fill(0));
//   for (let i = 0; i < length; i++) {
//     for (let j = 0; j < length; j++) {
//       if (i == j) matrix[i][j] = 0;
//       else {
//         matrix[i][j] = getDistance(
//           points[pairPoints[l++][0]],
//           points[pairPoints[l++][1]]
//         );
//       }
//     }
//   }
//   return matrix;
// };
const ps = [
  [10.841172501968856, 106.75928732628947],
  [10.847944564456817, 106.76160644370741],
  [10.847944364456817, 106.76160644370741],
  [10.847944562456817, 106.76160644370741],
  [10.827944564456817, 106.76150644370741],
];
//const result = Matrix(ps);

console.log(ps);
