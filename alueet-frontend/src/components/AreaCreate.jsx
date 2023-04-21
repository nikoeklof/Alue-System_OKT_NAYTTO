import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import theme from "../style/theme";
import AreaMap from "../AreaMap";
import CreateAreaForm from "./CreateAreaForm";

const styles = {
  areas: {
    flewGrow: 1,
  },
  selectMenu: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
  },
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
      },
    },
  },
  mainText: {
    borderBottom: "solid",
    borderColor: theme.bgColor.secondary,
    borderWidth: 1,
    mt: 4,
    mb: 2,
    pb: 2,
  },
  search: {
    mb: 2,
    ml: 2,
    width: "96%",
  },
  form: {
    width: "100%",
  },
  areainfo: {
    backgroundColor: theme.bgColor.primary,
    border: "solid",
    borderColor: theme.bgColor.secondary,
    borderWidth: 1,
    borderRadius: 1,
    display: "flex",
    py: 2,
    my: 1,
  },
  info: {
    flexGrow: 2,
  },
  infotext: {
    mb: 0.5,
  },
  button: {},
  areaButton: {
    m: 0.5,
  },
};

const AreaCreate = ({
  areas,
  addArea,
  layerContext,
  setLayerContext,
  setAreas,
}) => {
  return (
    <Container>
      <Typography sx={styles.mainText} variant="h6">
        Alueen luonti
      </Typography>

      <Container xs={styles.areas}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <AreaMap
              areas={areas}
              layerContext={layerContext}
              setLayerContext={setLayerContext}
              canEdit={true}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CreateAreaForm layerContext={layerContext} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default AreaCreate;
