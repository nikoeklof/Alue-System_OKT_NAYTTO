import React, { useEffect } from 'react';
import { Polygon } from 'react-leaflet';
import { useState } from 'react';

// Blueprint for the areas drawn to the map
const PolygonArea = ({
	props,
	onClick,
	positions,
	selectedArea,
	hoverStatus,
}) => {
	const [color, setCurrentColor] = useState(props.loaned ? 'green' : 'blue');
	const hoverColorOnSelected = '#a65052';
	const hoverColorDefault = '#5c57ff';
	const hoverColorLoaned = '#6bb572';

	useEffect(() => {
		if (props.id === hoverStatus) {
			if (props.id === selectedArea?.id) {
				return setCurrentColor(hoverColorOnSelected);
			}
			if (props.loaned) {
				return setCurrentColor(hoverColorLoaned);
			}
			return setCurrentColor(hoverColorDefault);
		} else {
			if (props.id === selectedArea?.id) return setCurrentColor('red');
			if (props.loaned) return setCurrentColor('green');
			return setCurrentColor('blue');
		}
	}, [hoverStatus, props.id, props.loaned, selectedArea?.id]);

	return (
		<Polygon
			pathOptions={{
				color: color,
				fillColor: color,
			}}
			fill='true'
			id={props.id}
			positions={positions}
			eventHandlers={{
				click: () => {
					if (onClick) return onClick();
					else return;
				},
				mouseover: () => {
					if (props.id === selectedArea?.id) {
						return setCurrentColor(hoverColorOnSelected);
					} else if (props.loaned) {
						return setCurrentColor(hoverColorLoaned);
					} else {
						return setCurrentColor(hoverColorDefault);
					}
				},
				mouseout: () => {
					if (props.id === selectedArea?.id)
						return setCurrentColor('red');
					if (props.loaned) return setCurrentColor('green');
					return setCurrentColor('blue');
				},
			}}
		/>
	);
};

export default PolygonArea;
