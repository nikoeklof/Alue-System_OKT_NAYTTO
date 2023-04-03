import { useEffect, useState } from "react";
import { areas as initialareas } from "./db/db";
import { LeafletMap } from "./components/LeafletMap";
import CreateAreaForm from "./components/CreateAreaForm";
import AreaContext from "./components/AreaContext";
import EditArea from "./components/EditArea";

const AreaMap = () => {
  const [areas, setAreas] = useState(initialareas);
  const [selectedArea, setSelectedArea] = useState(undefined);
  const [formActive, setFormActive] = useState(false);
  const [editArea, setEditArea] = useState(false);
  const [newArea, setNewArea] = useState({});

  const addArea = (props) => {
    setAreas([...areas, props]);
  };

  const clearSelected = () => {
    setSelectedArea(undefined);
  };

  const updateArea = (props) => {
    clearSelected();
    const areaList = [];
    console.log(props);
    var areaToUpdate = { ...props };
    areas.forEach((area) => {
      if (area.id !== props.id) areaList.push(area);
    });

    setAreas([...areaList, areaToUpdate]);
  };

  const removeArea = (props) => {
    const areaList = [];
    areas.forEach((area) => {
      if (area.id !== props.id) areaList.push(area);
    });
    setAreas([...areaList]);
    clearSelected();
  };
  const loanArea = () => {
    const areaList = [];
    var areaToLoan = { ...selectedArea };
    areaToLoan.loaned = !areaToLoan.loaned;

    areas.forEach((area) => {
      if (area.id !== selectedArea.id) areaList.push(area);
    });

    setAreas([...areaList, areaToLoan]);
    clearSelected();
  };

  return (
    <div>
      <LeafletMap
        areas={areas}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        clearSelected={clearSelected}
        formActive={formActive}
        setLayerContext={setNewArea}
      />
      <CreateAreaForm
        newArea={addArea}
        clearSelected={clearSelected}
        formActive={formActive}
        setFormActive={setFormActive}
        layerContext={newArea}
      />
      <AreaContext
        area={selectedArea}
        removeArea={removeArea}
        editArea={setEditArea}
        active={editArea}
        loanArea={loanArea}
      />
      <EditArea area={selectedArea} onSave={updateArea} formActive={editArea} />
    </div>
  );
};
export default AreaMap;
