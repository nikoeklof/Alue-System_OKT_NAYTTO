import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import theme from "./style/theme";
import AreaMap from "./AreaMap";

const styles = {
  map: {
    m: 2,
  },
  mainText: {
    borderBottom: "solid",
    borderColor: theme.bgColor.secondary,
    borderWidth: 1,
    mt: 4,
    mb: 2,
    pb: 2,
  },
};

const Main = ({ areas }) => {
  const [selectedArea, setSelectedArea] = useState(undefined);

  useEffect(() => {
    console.log(selectedArea);
  }, [selectedArea, setSelectedArea]);

  const clearSelected = () => {
    setSelectedArea(undefined);
  };

  return (
    <Container>
      <Typography sx={styles.mainText} variant="h6">
        Alueet
      </Typography>
      <Box sx={styles.map}>
        <AreaMap
          areas={areas}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          clearSelected={clearSelected}
          canEdit={false}
        />
      </Box>
    </Container>
  );
};

export default Main;
