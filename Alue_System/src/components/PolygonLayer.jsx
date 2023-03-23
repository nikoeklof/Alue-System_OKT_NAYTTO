import { LayerGroup } from "react-leaflet";
import PolygonArea from "./PolygonArea";

const PolygonLayer = ({
  areas,
  setSelectedArea,
  selectedArea,
  clearSelected,
}) => {
  return (
    <LayerGroup>
      {areas.map((area) => {
        const positions = area.latlngs.map((coords) => {
          return [coords.lat, coords.lng];
        });

        return (
          <PolygonArea
            key={area.id}
            props={area}
            positions={positions}
            onClick={() => {
              if (selectedArea) clearSelected();
              setSelectedArea(area);
            }}
          />
        );
      })}
    </LayerGroup>
  );
};
export default PolygonLayer;
