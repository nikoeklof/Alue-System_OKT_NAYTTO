import React, { useEffect } from "react";
import { Polygon } from "react-leaflet";
import { useState } from "react";
import { useMap } from "react-leaflet";

// Blueprint for the areas drawn to the map
const PolygonArea = ({
  props,
  onClick,
  positions,
  selectedArea,
  hoverStatus,
}) => {
  const [color, setCurrentColor] = useState(
    props.shareState.isShared ? "green" : "blue"
  );
  const hoverColorOnSelected = "#a65052";
  const hoverColorDefault = "#5c57ff";
  const hoverColorLoaned = "#6bb572";
  const map = useMap();

  useEffect(() => {
    if (props.id === hoverStatus) {
      if (props.id === selectedArea?.id) {
        map.flyTo(props.info.latlngs[0], 14, { animate: true });
        return setCurrentColor(hoverColorOnSelected);
      }
      if (props.shareState.isShared) {
        return setCurrentColor(hoverColorLoaned);
      }
      return setCurrentColor(hoverColorDefault);
    } else {
      if (props.id === selectedArea?.id) {
        map.flyTo(props.info.latlngs[0], 14, { animate: true });
        return setCurrentColor("red");
      }
      if (props.shareState.isShared) return setCurrentColor("green");
      return setCurrentColor("blue");
    }
  }, [
    hoverStatus,
    props.id,
    props.shareState.isShared,
    selectedArea?.id,
    map,
    props.info.latlngs,
  ]);

  return (
    <Polygon
      pathOptions={{
        color: color,
        fillColor: color,
      }}
      fill="true"
      id={props.id}
      positions={positions}
      eventHandlers={{
        click: () => {
          if (onClick) return onClick();
          else return;
        },
        mouseover: () => {
          if (props.id === selectedArea?.id) {
            return setCurrentColor(hoverColorOnSelected);
          } else if (props.shareState.isShared) {
            return setCurrentColor(hoverColorLoaned);
          } else {
            return setCurrentColor(hoverColorDefault);
          }
        },
        mouseout: () => {
          if (props.id === selectedArea?.id) return setCurrentColor("red");
          if (props.shareState.isShared) return setCurrentColor("green");
          return setCurrentColor("blue");
        },
      }}
    />
  );
};

export default PolygonArea;
