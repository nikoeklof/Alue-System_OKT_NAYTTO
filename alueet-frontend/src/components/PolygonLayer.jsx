import React from "react";
import { LayerGroup } from "react-leaflet";

import PolygonArea from "./PolygonArea";

const PolygonLayer = ({
  areas,
  setSelectedArea,
  selectedArea,
  clearSelected,
  hoverStatus,
}) => {
  return (
    <LayerGroup>
      {areas ? (
        areas.map((area, i) => {
          const positions = area.info.latlngs.map((coords) => {
            return [parseFloat(coords.lat), parseFloat(coords.lng)];
          });
          if (setSelectedArea !== undefined) {
            return (
              <div key={area.id}>
                <PolygonArea
                  key={i}
                  props={area}
                  selectedArea={selectedArea}
                  positions={positions}
                  hoverStatus={hoverStatus}
                  onClick={() => {
                    if (selectedArea?.id === area.id) return clearSelected();
                    else {
                      setSelectedArea(area);
                    }
                  }}
                />
              </div>
            );
          }
          return (
            <div key={area.id}>
              <PolygonArea
                key={i}
                props={area}
                selectedArea={selectedArea}
                positions={positions}
                hoverStatus={hoverStatus}
              />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </LayerGroup>
  );
};

export default PolygonLayer;
