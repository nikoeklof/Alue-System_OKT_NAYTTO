import { useEffect, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { setCoordinates } from "./Coordinates";

const DrawComponent = () => {
  const [areaCoordinates, setAreaCoordinates] = useState([]);

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

          setCoordinates(parsedCoords);
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
