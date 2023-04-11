import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";

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

const CreateAreaForm = ({ addArea, layerContext }) => {
  const [areaName, setAreaName] = useState("");
  const [apartmentAmount, setApartmentAmount] = useState("");
  const [areaCity, setAreaCity] = useState("");

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
          onChange={(e) => setApartmentAmount(e.target.value)}
          type="number"
          label="Asuntojen määrä"
          sx={styles.textField}
        />
        <TextField
          onChange={(e) => setAreaCity(e.target.value)}
          type="text"
          label="Kaupunginosa"
          sx={styles.textField}
        />
      </FormControl>

      <Button
        variant="contained"
        type="button"
        sx={styles.btns}
        onClick={() => {
          const layer = layerContext;
          console.log(layer);
          layer.layer.remove();

          addArea({
            id: layer.layer._leaflet_id,
            name: areaName,
            buildings: parseInt(apartmentAmount),
            city: areaCity,
            areaOwner: "admin",
            latlngs: layer.coords,
          });
        }}
      >
        Luo alue
      </Button>
    </>
  );
};

export default CreateAreaForm;
