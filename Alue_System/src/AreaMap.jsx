import { useEffect, useState } from "react";
import initialAreas from "./db/db";
import { LeafletMap } from "./components/LeafletMap";
import CreateAreaForm from "./components/CreateAreaForm";
import AreaContext from "./components/AreaContext";

const AreaMap = () => {
  const [areas, setAreas] = useState(initialAreas);
  const [selectedArea, setSelectedArea] = useState({});
  const addArea = (props) => {
    setAreas([...areas, props]);
  };
  const clearSelected = () => {
    setSelectedArea({});
  };
  useEffect(() => {
    console.log(selectedArea);
  }, [selectedArea, setSelectedArea]);
  return (
    <div>
      <LeafletMap
        areas={areas}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        clearSelected={clearSelected}
      />
      <CreateAreaForm newArea={addArea} />
      <AreaContext area={selectedArea} />
    </div>
  );
};
export default AreaMap;
