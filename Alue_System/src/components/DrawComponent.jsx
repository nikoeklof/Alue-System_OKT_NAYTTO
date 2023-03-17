import { useEffect, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [leafletId, setLeafletId] = useState();

  useEffect(() => {
    console.log(coordinates, leafletId);
  }, [coordinates]);

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

          //The coordinates are in wrong "format" when fetching them from layer._latlngs[0] variable,
          //parsing them into format that i can use to create my own polygons instead of using react-leaflet-draw polygons

          const latlngObject = layer._latlngs[0];

          const parsedCoords = [];
          latlngObject.forEach((obj) => {
            parsedCoords.push([obj.lat, obj.lng]);
          });

          setCoordinates(parsedCoords);
          setLeafletId(layer._leaflet_id);
        }}
        onEdited={function (e) {
          //I need to do some janky parsing in order to extract the edited polygons position coordinates
          const layer = e.layers._layers;

          const latlngObject = layer[Object.keys(layer)[0]]._latlngs[0];
          console.log(latlngObject);
          const parsedCoords = [];
          latlngObject.forEach((obj) => {
            parsedCoords.push([obj.lat, obj.lng]);
          });
          console.log(parsedCoords);
          setCoordinates(parsedCoords);
        }}
      />
    </FeatureGroup>
  );
};

export default DrawComponent;
