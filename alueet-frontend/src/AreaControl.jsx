import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "./style/theme";
import AreaMap from "./AreaMap";
import AreaTableRowComponent from "./components/AreaTableRowComponent";
import { ALLOW_AREA_REQUEST, MAKE_REQUEST } from "./queries";
import { useMutation } from "@apollo/client";

const styles = {
  container: {
    mb: 8,
  },
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

const AreaControl = ({ areas, setAreas, layerContext, setLayerContext }) => {
  const [selectedArea, setSelectedArea] = useState(undefined);
  const [hoverStatus, setHoverStatus] = useState(undefined);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [makeAreaRequest] = useMutation(MAKE_REQUEST, {
    onError: (e) => {
      console.log(e);
    },
  });
  const [loanAreaMutation] = useMutation(ALLOW_AREA_REQUEST, {
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    console.log(selectedArea);
  }, [selectedArea, setSelectedArea]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateArea = (props) => {
    const areaList = areas;
    console.log(props);
    var areaToUpdate = { ...props };
    areaList.forEach((area, i) => {
      if (area.id === props.id) areaList.splice(i, 1, areaToUpdate);
    });

    setAreas([...areaList]);
  };
  const loanArea = async (props) => {
    makeAreaRequest({
      variables: { areaId: props.id, email: "nikoe123@outlook.com" },
    }).then(() => {
      loanAreaMutation({
        variables: { areaId: props.id, email: "nikoe123@outlook.com" },
      });
    });
  };

  const clearSelected = () => {
    setSelectedArea(undefined);
  };

  return (
    <Container sx={styles.container}>
      <Typography sx={styles.mainText} variant="h6">
        Alueiden hallinta
      </Typography>
      <TextField
        label="Hae"
        type="search"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={styles.search}
      />
      <Container xs={styles.areas}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <AreaMap
              areas={areas}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              clearSelected={clearSelected}
              layerContext={layerContext}
              setLayerContext={setLayerContext}
              canEdit={false}
              hoverStatus={hoverStatus}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper sx={styles.form}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableBody>
                    {areas
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((area) => (
                        <AreaTableRowComponent
                          key={area.id}
                          area={area}
                          setSelectedArea={setSelectedArea}
                          selectedArea={selectedArea}
                          setHoverStatus={setHoverStatus}
                          loanArea={loanArea}
                          updateArea={updateArea}
                        />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={areas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Rivejä per sivu:"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default AreaControl;
