import { useRef } from "react";

import {
  MapContainer,
  TileLayer,
  Pane,
  useMap,
  useMapEvents,
} from "react-leaflet";
import React from "react";
import DrawComponent from "./DrawComponent";
import PolygonLayer from "./PolygonLayer";

export const LeafletMap = ({
  areas,
  setSelectedArea,
  selectedArea,
  clearSelected,
}) => {
  return (
    <div>
      <MapContainer
        style={{ height: "450px", width: "500px" }}
        center={[61.6834, 27.2653]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Pane name="areaPane" style={{ zIndex: 100 }}>
          <DrawComponent />
        </Pane>
        <PolygonLayer
          areas={areas}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          clearSelected={clearSelected}
        />
      </MapContainer>
    </div>
  );
};
