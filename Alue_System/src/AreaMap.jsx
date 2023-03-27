import { useEffect, useState } from "react";
import initialAreas from "./db/db";
import { LeafletMap } from "./components/LeafletMap";
import CreateAreaForm from "./components/CreateAreaForm";
import AreaContext from "./components/AreaContext";

const AreaMap = () => {
  const [areas, setAreas] = useState(initialAreas);
  const [selectedArea, setSelectedArea] = useState(undefined);

  useEffect(() => {
    console.log(areas);
  }, [areas]);
  const addArea = (props) => {
    setAreas([...areas, props]);
  };
  const clearSelected = () => {
    setSelectedArea(undefined);
  };
  const removeArea = (props) => {
    const areaList = [];
    areas.forEach((area) => {
      if (area.id !== props.id) areaList.push(area);
    });
    setAreas([...areaList]);
  };
  return (
    <div>
      <LeafletMap
        areas={areas}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        clearSelected={clearSelected}
      />
      <CreateAreaForm newArea={addArea} clearSelected={clearSelected} />
      <AreaContext area={selectedArea} removeArea={removeArea} />
    </div>
  );
};
export default AreaMap;
