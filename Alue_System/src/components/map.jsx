import { useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Pane,
  useMapEvents,
  useMap,
} from "react-leaflet";

import DrawComponent from "./DrawComponent";

import db from "../db/db.json";
const ClickHandler = () => {
  const map = useMap();
};

export const LeafletMap = () => {
  const [addArea, setAddArea] = useState(false);
  const [mapLayers, setMapLayers] = useState([]);
  const areas = db;
  console.log(areas);

  const mapRef = useRef();

  const _onCreate = (e) => {
    const { layerType, layer } = e;

    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };
  return (
    <>
      <MapContainer
        style={{ height: "450px", width: "500px" }}
        center={[61.6834, 27.2653]}
        zoom={11}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Pane name="areaPane" style={{ zIndex: 100 }}>
          {addArea == true ? null : <DrawComponent props={{ _onCreate }} />}
        </Pane>
        <ClickHandler />
      </MapContainer>
      <pre>{JSON.stringify(mapLayers)}</pre>
    </>
  );
};
