import L from "leaflet";

const getDistance = (latlng1, latlng2) => {
  return L.latLng(latlng1).distanceTo(latlng2);
};

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
