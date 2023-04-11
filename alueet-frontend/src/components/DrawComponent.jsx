import React, { useState } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const DrawComponent = ({ setLayerContext }) => {
	const [areaCreated, setAreaCreated] = useState(false);
	return (
		<FeatureGroup>
			<EditControl
				position='topright'
				// Disabling all other drawing options except polygons for our usecase
				draw={{
					rectangle: false,
					circle: false,
					polyline: false,
					marker: false,
					circlemarker: false,
					polygon: !areaCreated,
				}}
				edit={{
					remove: false,
				}}
				onCreated={function (e) {
					const { layer } = e;

					const latlngs = layer._latlngs[0];

					setLayerContext({ coords: latlngs, layer: layer });
					setAreaCreated(!areaCreated);
				}}
				onEdited={function (e) {
					const layer =
						e.layers._layers[Object.keys(e.layers._layers)[0]];

					const latlngs = layer._latlngs[0];

					setLayerContext({ coords: latlngs, layer: layer });
				}}
			/>
		</FeatureGroup>
	);
};

export default DrawComponent;
