import React from "react";
import { MapContainer, TileLayer, Pane } from "react-leaflet";
import DrawComponent from "./DrawComponent";
import PolygonLayer from "./PolygonLayer";
import CreateAreaForm from "./CreateAreaForm";

export const LeafletMap = ({
  areas,
  setSelectedArea,
  selectedArea,
  clearSelected,
  addArea,
  layerContext,
  setLayerContext,
  canEdit,
  hoverStatus,
}) => {
  return (
    <div>
      <CreateAreaForm
        addArea={addArea}
        clearSelected={clearSelected}
        layerContext={layerContext}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MapContainer
          // Map has to have a set height, otherwise does not render
          style={{ height: "490px", width: "100%" }}
          center={[61.6834, 27.2653]}
          zoom={11}
          scrollWheelZoom={true}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Pane name="areaPane" style={{ zIndex: 100 }}>
            {canEdit ? (
              <DrawComponent setLayerContext={setLayerContext} />
            ) : null}
          </Pane>
          <PolygonLayer
            areas={areas}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            clearSelected={clearSelected}
            hoverStatus={hoverStatus}
          />
        </MapContainer>
      </div>
    </div>
  );
};
