import React from 'react';

import { LeafletMap } from './components/LeafletMap';

const AreaMap = ({
  canEdit,
  areas,

  setSelectedArea,
  selectedArea,
  clearSelected,
  layerContext,
  setLayerContext,
  hoverStatus,
  cityIndex,
  cities,
  cityFilter,
}) => {
	return (
		<div>
			<LeafletMap
				selectedArea={selectedArea}
				setSelectedArea={setSelectedArea}
				cities={cities}
				cityIndex={cityIndex}
				areas={areas ? areas : null}
				addArea={canEdit}
				layerContext={canEdit ? layerContext : null}
				setLayerContext={canEdit ? setLayerContext : null}
				canEdit={canEdit}
				clearSelected={clearSelected}
				hoverStatus={hoverStatus}
				cityFilter={cityFilter}
			/>
		</div>
	);
};

export default AreaMap;
