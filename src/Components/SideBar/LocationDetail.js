import React from "react";

const LocationDetail = ({ latlng, name, map }) => {
  console.log(latlng, name);
  return (
    <div
      className="detail-location"
      onClick={() => map.flyTo(latlng, map.getZoom())}
    >
      {/* <div>{`Location ${latlng[0]} ${latlng[1]}`}</div>
      <div>{name}</div> */}
      <div>{`lat: ${latlng[0].toFixed(6)} 
       lng: ${latlng[1].toFixed(6)}`}</div>
      <div>{name}</div>
    </div>
  );
};

export default LocationDetail;
