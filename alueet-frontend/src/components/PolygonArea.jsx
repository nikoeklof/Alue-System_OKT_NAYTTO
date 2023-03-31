import { Polygon } from "react-leaflet";

// Blueprint for the areas drawn to the map, still needs functionality
const PolygonArea = ({ props, onClick, positions, selectedArea }) => {
  const getColor = () => {
    if (props.loaned && props.id !== selectedArea?.id) {
      return "green";
    } else if (props.id === selectedArea?.id) {
      return "red";
    } else {
      return "blue";
    }
  };

  return (
    <Polygon
      pathOptions={{
        color: getColor(),
        fillColor: getColor(),
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
