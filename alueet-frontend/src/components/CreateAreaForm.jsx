import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { CREATE_AREA } from "../queries";
import { useMutation } from "@apollo/client";

const styles = {
  makeAreaBtn: {
    ml: 0.5,
    mt: 1,
    padding: 1,
  },
  form: {
    mb: 1,
    width: "90%",
  },
  textField: {
    m: 0.5,
  },
  btns: {
    mt: 1,
    ml: 0.5,
    mb: 2,
  },
};

const CreateAreaForm = ({ layerContext }) => {
  const [areaName, setAreaName] = useState("");
  const [apartmentAmount, setApartmentAmount] = useState("");
  const [areaCity, setAreaCity] = useState("");
  const [quarterName, setQuarterName] = useState("");
  const [miscInfo, setMiscInfo] = useState("");
  const [createArea, { data }] = useMutation(CREATE_AREA);
  return (
    <>
      <FormControl sx={styles.form}>
        <TextField
          onChange={(e) => setAreaName(e.target.value)}
          type="text"
          label="Alueen nimi"
          sx={styles.textField}
        />
        <TextField
          onChange={(e) => setQuarterName(e.target.value)}
          type="text"
          label="Kaupunginosa"
          sx={styles.textField}
        />
        <TextField
          onChange={(e) => setApartmentAmount(e.target.value)}
          type="number"
          label="Asuntojen määrä"
          sx={styles.textField}
        />
        <TextField
          onChange={(e) => setAreaCity(e.target.value)}
          type="text"
          label="Kaupunki"
          sx={styles.textField}
        />
        <TextField
          onChange={(e) => setMiscInfo(e.target.value)}
          type=""
          label="Lisätietoja"
          sx={styles.textField}
          multiline
        />
      </FormControl>

      <Button
        variant="contained"
        type="button"
        sx={styles.btns}
        onClick={() => {
          layerContext.layer.remove();
          const parsedCoords = [];
          layerContext?.coords.forEach((coord) => {
            parsedCoords.push({
              lat: coord.lat.toString(),
              lng: coord.lng.toString(),
            });
          });

          createArea({
            variables: {
              mapId: layerContext?.layer._leaflet_id,
              address: areaName,
              buildings: parseInt(apartmentAmount),
              cityName: areaCity,
              latlngs: parsedCoords,
              quarter: quarterName,
              misc: miscInfo,
            },
            onError: (e) => {
              console.log(e);
            },
          });
        }}
      >
        Luo alue
      </Button>
    </>
  );
};

export default CreateAreaForm;
