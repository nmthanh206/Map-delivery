export const getWayPointsArray = control => {
  const wps = control
    .getPlan()
    .getWaypoints()
    .filter(wp => wp.latLng);
  const wpsArray = wps.map(({ latLng }) => [latLng.lat, latLng.lng]);
  return wpsArray;
};
