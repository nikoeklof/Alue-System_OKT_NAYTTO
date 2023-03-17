import { useRef, useState } from "react";
import { MapContainer, TileLayer, Pane, useMap } from "react-leaflet";
import React from "react";
import DrawComponent from "./DrawComponent";
import PolygonArea from "./PolygonArea";

export const LeafletMap = () => {
  const mapRef = useRef();

  const testCoords = [
    [61.688895272796444, 27.209014892578125],
    [61.68107873822264, 27.255020141601566],
    [61.66869851021201, 27.23167419433594],
    [61.66837264771457, 27.198028564453125],
  ];

  return (
    <>
      <MapContainer
        style={{ height: "450px", width: "500px" }}
        center={[61.6834, 27.2653]}
        zoom={11}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Pane name="areaPane" style={{ zIndex: 100 }}>
          <DrawComponent />
        </Pane>
        <PolygonArea props={{ id: 1, positions: testCoords }} />
      </MapContainer>
    </>
  );
};
