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
          polygon: true,
        }}
        onCreated={function (e) {
          const { layer } = e;
          // Grabbing the latlng coordinates from the polygon created by
          // leaflet-draw to use in my own polygons

          const latlngs = layer._latlngs[0];

          setLayerContext({ coords: latlngs, layer: layer });
        }}
        onEdited={function (e) {
          const layer = e.layers._layers;
          console.log(layer[Object.keys(layer)[0]]);
          // Checking if the layer has been edited, otherwise will return as undefined
          if (layer[Object.keys(layer)[0]] !== undefined) {
            const latlngs = layer[Object.keys(layer)[0]]._latlngs[0];

            return setLayerContext({ coords: latlngs, layer: layer });
          }
          return;
        }}
        onDeleted={function () {
          // Clearing the layercontext to prevent wrong states
          setLayerContext({});
        }}
      />
    </FeatureGroup>
  );
};

export default DrawComponent;
