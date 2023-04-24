import React from "react";

import { LeafletMap } from "./components/LeafletMap";

const AreaMap = ({
  canEdit,
  areas,

  setSelectedArea,
  selectedArea,
  clearSelected,
  layerContext,
  setLayerContext,
  hoverStatus,
}) => {
  return (
    <div>
      <LeafletMap
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        areas={areas}
        addArea={canEdit}
        layerContext={canEdit ? layerContext : null}
        setLayerContext={canEdit ? setLayerContext : null}
        canEdit={canEdit}
        clearSelected={clearSelected}
        hoverStatus={hoverStatus}
      />
    </div>
  );
};

export default AreaMap;
