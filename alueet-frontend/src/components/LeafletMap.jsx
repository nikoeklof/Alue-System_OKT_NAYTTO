import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Pane, useMap } from "react-leaflet";
import DrawComponent from "./DrawComponent";
import PolygonLayer from "./PolygonLayer";
import { cities } from "../db/cities";

export const LeafletMap = ({
  areas,
  setSelectedArea,
  selectedArea,
  clearSelected,
  setLayerContext,
  canEdit,
  hoverStatus,
  cityIndex,
  cityFilter,
}) => {
  const [cityCoords, setCityCoords] = useState(
    cityIndex !== -1 || cityIndex !== undefined
      ? [cities[cityIndex]?.Latitude, cities[cityIndex]?.Longitude]
      : [cities[0]?.Latitude, cities[0]?.Longitude]
  );

  useEffect(() => {
    if (cityIndex !== -1) {
      setCityCoords([cities[cityIndex].Latitude, cities[cityIndex].Longitude]);
    }
  }, [cityIndex]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <MapContainer
          // Map has to have a set height, otherwise does not render
          style={{
            height: "490px",
            width: "100%",
            zIndex: 1,
            position: "initial",
            minWidth: "100%",
            minHeight: "490px",
          }}
          center={cityCoords}
          zoom={11}
          scrollWheelZoom={true}
          doubleClickZoom={false}
        >
          <SetViewOnCityIndexChange
            coords={cityCoords[0] ? cityCoords : undefined}
            selectedArea={selectedArea}
            cityIndex={cityIndex}
            cities={cities}
            cityFilter={cityFilter}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Pane name="areaPane" style={{ zIndex: 100 }}>
            {canEdit ? (
              <DrawComponent setLayerContext={setLayerContext} />
            ) : null}
          </Pane>
          <PolygonLayer
            areas={areas}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            clearSelected={clearSelected}
            hoverStatus={hoverStatus}
          />
        </MapContainer>
      </div>
    </div>
  );
};
const SetViewOnCityIndexChange = ({
  coords,
  cityIndex,
  cities,
  cityFilter,
}) => {
  const map = useMap();

  useEffect(() => {
    if (cityIndex === -1) return;
    if (cityFilter === cities[cityIndex].Kunta) {
      map.flyTo(coords, 12, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [cityFilter, cityIndex, coords, map, cities]);

  return;
};
