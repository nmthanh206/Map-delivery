import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import { control } from "../../Map";
import { getWayPointsArray } from "../../Ulti/getWayPointsArray";
const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(), // required
  showMarker: false, // optional: true|false  - default true
  showPopup: false, // optional: true|false  - default false
  marker: {
    // optional: L.Marker    - default L.Icon.Default
    icon: new L.Icon.Default(),
    draggable: false,
  },
  resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
  maxMarkers: 1, // optional: number      - default 1
  retainZoomLevel: false, // optional: true|false  - default false
  animateZoom: true, // optional: true|false  - default true
  autoClose: false, // optional: true|false  - default false
  searchLabel: "Enter address", // optional: string      - default 'Enter address'
  keepResult: false, // optional: true|false  - default false
  updateMap: true, // optional: true|false  - default true
  style: "bar",
  // onSubmit: e => console.log(e),
});

export default searchControl;
export const popupFormat = setPoints => {
  return ({ query, result }) => {
    // console.log(query, result);
    // if (data.results.length !== 1) return;
    const wpsArray = getWayPointsArray(control);
    control.getPlan().setWaypoints([...wpsArray, [query.data.y, query.data.x]]);
    setPoints([...wpsArray, [query.data.y, query.data.x]]);
  };
};
