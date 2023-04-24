import React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawComponent = ({ setLayerContext, layerContext }) => {
  return (
    <div>
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
            polygon: true,
          }}
          onCreated={function (e) {
            const { layer } = e;

            const latlngs = layer._latlngs[0];

            setLayerContext({ coords: latlngs, layer: layer });
          }}
          onEdited={function (e) {
            const layer = e.layers._layers[Object.keys(e.layers._layers)[0]];

            const latlngs = layer._latlngs[0];

            setLayerContext({ coords: latlngs, layer: layer });
          }}
          onDeleted={() => {
            setLayerContext(null);
          }}
        />
      </FeatureGroup>
    </div>
  );
};

export default DrawComponent;
