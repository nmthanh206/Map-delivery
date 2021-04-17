import L from "leaflet";

const getDistance = (latlng1, latlng2) => {
  return L.latLng(latlng1).distanceTo(latlng2);
};

export const Matrix = (points, length = points.length) => {
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      console.log(i, j);
    }
  }
};
