import React from "react";

import { LeafletMap } from "./components/LeafletMap";

const AreaMap = ({
  canEdit,
  areas,
  addArea,
  setSelectedArea,
  selectedArea,
  clearSelected,
  layerContext,
  setLayerContext,
}) => {
  return (
    <div>
      <LeafletMap
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        areas={areas}
        addArea={canEdit ? addArea : undefined}
        layerContext={canEdit ? layerContext : undefined}
        setLayerContext={canEdit ? setLayerContext : undefined}
        canEdit={canEdit}
        clearSelected={clearSelected}
      />
    </div>
  );
};

export default AreaMap;
