import { useState } from "react";
import { Polygon } from "react-leaflet";

// Blueprint for the areas drawn to the map, still needs functionality
const PolygonArea = ({ props, onClick, positions, selectedArea }) => {
  return (
    <Polygon
      pathOptions={{
        color: props.id === selectedArea?.id ? "red" : "blue",
        fillColor: props.id === selectedArea?.id ? "red" : "blue",
      }}
      fill="true"
      id={props.id}
      positions={positions}
      eventHandlers={{
        click: () => {
          onClick();
        },
      }}
    />
  );
};

export default PolygonArea;
