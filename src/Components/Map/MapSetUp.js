import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";

function MapSetUp({ center, zoom, scrollWheelZoom, whenCreated, children }) {
  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        whenCreated={whenCreated}
      >
        {children}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}

export default React.memo(MapSetUp);
