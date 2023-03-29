import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawComponent = ({ formActive, setLayerContext }) => {
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
          polygon: false || formActive,
        }}
        onCreated={function (e) {
          const { layer } = e;

          const latlngs = layer._latlngs[0];

          setLayerContext({ coords: latlngs, layer: layer });
        }}
        onEdited={function (e) {
          const layer = e.layers._layers;

          const latlngs = layer[Object.keys(layer)[0]]._latlngs[0];

          setLayerContext({ coords: latlngs, layer: layer });
        }}
      />
    </FeatureGroup>
  );
};

export default DrawComponent;
