import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawComponent = ({ props }) => {
  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        draw={{
          rectangle: false,
        }}
        onCreated={props._onCreate || null}
      />
    </FeatureGroup>
  );
};

export default DrawComponent;
