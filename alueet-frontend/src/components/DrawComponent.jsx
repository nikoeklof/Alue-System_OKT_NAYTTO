import React, { useEffect, useRef, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawComponent = ({ setLayerContext, layerContext }) => {
  const polygon = {
    rectangle: false,
    circle: false,
    polyline: false,
    marker: false,
    circlemarker: false,
    polygon: true,
  };
  const noPolygon = {
    rectangle: false,
    circle: false,
    polyline: false,
    marker: false,
    circlemarker: false,
    polygon: false,
  };
  const [drawProps, setDrawProps] = useState(polygon);

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        // Disabling all other drawing options except polygons for our usecase
        draw={drawProps}
        onCreated={function (e) {
          const { layer } = e;

          const latlngs = layer._latlngs[0];
          setDrawProps(noPolygon);
          setLayerContext({ coords: latlngs, layer: layer });
        }}
        onEdited={function (e) {
          const layer = e.layers._layers[Object.keys(e.layers._layers)[0]];

          const latlngs = layer._latlngs[0];

          setLayerContext({ coords: latlngs, layer: layer });
        }}
        onDeleted={() => {
          setLayerContext(null);
          setDrawProps(polygon);
        }}
      />
    </FeatureGroup>
  );
};

export default DrawComponent;
