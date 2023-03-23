import { useEffect, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { setArea, setCoordinates } from "./Variables";

const DrawComponent = () => {
  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        // Disabling all other drawing options except polygons for our usecase
        draw={{
          rectangle: false,
          circle: false,
          polyline: false,
          marker: false,
          circlemarker: false,
        }}
        onCreated={function (e) {
          const { layerType, layer } = e;

          const latlngs = layer._latlngs[0];

          setArea({ coords: latlngs, layer: layer });
        }}
        onEdited={function (e) {
          const layer = e.layers._layers;

          const latlngs = layer[Object.keys(layer)[0]]._latlngs[0];

          setArea({ coords: latlngs, layer: layer });
        }}
      />
    </FeatureGroup>
  );
};

export const coordinates = (coords) => {
  const areaCoordinates = coords;
  return areaCoordinates;
};

export default DrawComponent;
