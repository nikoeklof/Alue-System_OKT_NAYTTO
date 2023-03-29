import React from "react";
import { MapContainer, TileLayer, Pane } from "react-leaflet";
import DrawComponent from "./DrawComponent";
import PolygonLayer from "./PolygonLayer";

export const LeafletMap = ({
	areas,
	setSelectedArea,
	selectedArea,
	clearSelected,
	formActive,
	setLayerContext,
}) => {
	return (
		<div>
			<MapContainer
				style={{ height: "450px", width: "500px" }}
				center={[61.6834, 27.2653]}
				zoom={11}
				scrollWheelZoom={true}
				doubleClickZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Pane name="areaPane" style={{ zIndex: 100 }}>
					<DrawComponent
						formActive={formActive}
						setLayerContext={setLayerContext}
					/>
				</Pane>
				<PolygonLayer
					areas={areas}
					selectedArea={selectedArea}
					setSelectedArea={setSelectedArea}
					clearSelected={clearSelected}
				/>
			</MapContainer>
		</div>
	);
};
