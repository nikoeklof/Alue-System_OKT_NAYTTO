import { useState } from "react";
import { Polygon } from "react-leaflet";

// Blueprint for the areas drawn to the map, still needs functionality 
const PolygonArea = ({ props }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Polygon
      pathOptions={{
        color: selected ? "red" : "blue",
        fillColor: selected ? "red" : "blue",
      }}
      fill="true"
      id={props.id}
      positions={props.positions}
      eventHandlers={{
        click: () => {
          console.log(props.id, selected);
          setSelected(!selected);
        },
      }}
    />
  );
};

export default PolygonArea;
