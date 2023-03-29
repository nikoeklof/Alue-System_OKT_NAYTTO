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
      {areas.map((area, i) => {
        const positions = area.latlngs.map((coords) => {
          return [coords.lat, coords.lng];
        });

        return (
          <PolygonArea
            key={i}
            props={area}
            selectedArea={selectedArea}
            positions={positions}
            onClick={() => {
              if (selectedArea?.id === area.id) return clearSelected();
              else setSelectedArea(area);
            }}
          />
        );
      })}
    </LayerGroup>
  );
};
export default PolygonLayer;
