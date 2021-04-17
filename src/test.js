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
export const Matrix = (points, length = points.length) => {
  const pairPoints = new Array(15).fill(0).map(() => new Array(2).fill(0));
  let k = 0;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      //  console.log(i, j);
      pairPoints[k++] = [i, j];
      const x = k - 1;
      // console.log(pairPoints[x]);
    }
  }
  let l = 0;
  //console.log(pairPoints);
  const matrix = new Array(length).fill(0).map(() => new Array(length).fill(0));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < i; j++) {
      if (i == j) matrix[i][j] = 0;
      else {
        matrix[i][j] = getDistance(
          points[pairPoints[l][0]],
          points[pairPoints[l][1]]
        );
        matrix[j][i] = getDistance(
          points[pairPoints[l][0]],
          points[pairPoints[l][1]]
        );
        l = l + 1;
      }
    }
  }
  return matrix;
};
// const ps = [
//   [10.841172501968856, 106.75928732628947],
//   [10.847944564456817, 106.76160644370741],
//   [10.847944364456817, 106.76160644370741],
//   [10.847944562456817, 106.76160644370741],
//   [10.827944564456817, 106.76150644370741],
//   [10.897944564456817, 106.76120644370741],
// ];
// Matrix(ps);
// console.log(Matrix(ps));
