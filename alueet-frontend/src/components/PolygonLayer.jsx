import React from 'react';
import { LayerGroup } from 'react-leaflet';
import PolygonArea from './PolygonArea';

const PolygonLayer = ({
	areas,
	setSelectedArea,
	selectedArea,
	clearSelected,
	hoverStatus,
}) => {
	return (
		<LayerGroup>
			{areas.map((area, i) => {
				const positions = area.info.latlngs.map((coords) => {
					return [parseFloat(coords.lat), parseFloat(coords.lng)];
				});
				if (setSelectedArea !== undefined) {
					return (
						<PolygonArea
							key={i}
							props={area}
							selectedArea={selectedArea}
							positions={positions}
							hoverStatus={hoverStatus}
							onClick={() => {
								if (selectedArea?.id === area.id)
									return clearSelected();
								else setSelectedArea(area);
							}}
						/>
					);
				}
				return (
					<PolygonArea
						key={i}
						props={area}
						selectedArea={selectedArea}
						positions={positions}
						hoverStatus={hoverStatus}
					/>
				);
			})}
		</LayerGroup>
	);
};
export default PolygonLayer;
