import React from 'react';

import { LeafletMap } from './components/LeafletMap';

const AreaMap = ({
	canEdit,
	areas,
	addArea,
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
				addArea={canEdit ? addArea : undefined}
				layerContext={canEdit ? layerContext : undefined}
				setLayerContext={canEdit ? setLayerContext : undefined}
				canEdit={canEdit}
				clearSelected={clearSelected}
				hoverStatus={hoverStatus}
			/>
		</div>
	);
};

export default AreaMap;
