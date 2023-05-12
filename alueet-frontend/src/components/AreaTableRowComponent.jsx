/* eslint-disable indent */
import React, { useState, Fragment, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Alert,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import DeleteWarningModal from "./DeleteWarningModal";
import EditAreaModal from "./EditAreaModal";
import LendAreaModal from "./LendAreaModal";
import ReturnAreaModal from "./ReturnAreaModal";
import theme from "../style/theme";
import { useRef } from "react";
import { DeleteArea, ReturnArea } from "../graphql/functions";

const styles = {
  areas: {
    flewGrow: 1,
  },
  tableHeadText: {
    fontWeight: "bold",
  },
  miscInfoHeadText: {
    width: "100%",
    mt: 1,
    mb: 1,
    pt: 1,
    pb: 1,
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
  alert: {
    m: 0.5,
    mb: 1,
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

const AreaTableRowComponent = ({
  area,
  setSelectedArea,
  selectedArea,
  setHoverStatus,
  loanArea,
  cityFilter,
  loggedUser,
}) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openLend, setOpenLend] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const scrollRef = useRef(null);
  const [deleteArea] = DeleteArea();

  const [returnArea] = ReturnArea();

  useEffect(() => {
    if (area.id !== selectedArea?.id) {
      setOpen(false);
    } else {
      setOpen(true);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView(true, { behavior: "smooth" });
      }, 250);
    }
  }, [area.id, selectedArea?.id]);

  const delProps = {
    openDel,
    handleCloseDelModal: () => setOpenDel(false),
    warningText: "Haluatko varmasti poistaa alueen?",
    handleConfirm: () =>
      deleteArea({
        variables: { areaId: area.id },
      }),
  };
  const editProps = {
    openEdit,
    handleCloseEditModal: () => setOpenEdit(false),

    originalArea: area,
  };
  const lendProps = {
    openLend,
    handleCloseLendModal: () => setOpenLend(false),
  };
  const returnProps = {
    openReturn,
    handleCloseReturnModal: () => setOpenReturn(false),
  };

  if (area) {
    return (
      <>
        <Fragment>
          <TableRow
            ref={scrollRef}
            hover={true}
            key={area.id}
            sx={{ "& > *": { borderBottom: "unset" } }}
          >
            <TableCell
              onMouseOver={() => {
                setHoverStatus(area.id);
              }}
              onMouseOut={() => {
                setHoverStatus(undefined);
              }}
              onClick={() => {
                setSelectedArea(open ? undefined : area);
              }}
            >
              {area.info.address}
            </TableCell>
            <TableCell sx={{ maxWidth: "66px" }}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setSelectedArea(open ? undefined : area);
                }}
              >
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ py: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {area.shareState.shareRequests.includes(loggedUser?.email) ? (
                  <Alert severity="success" sx={styles.alert}>
                    Lainauspyyntö jätetty
                  </Alert>
                ) : (
                  <></>
                )}
                {area.shareState.sharedTo === loggedUser?.email ? (
                  <Alert severity="success" sx={styles.alert}>
                    Alue on lainattu sinulle
                  </Alert>
                ) : (
                  <></>
                )}

                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Info
                  </Typography>
                  <Table size="small" aria-label="areas">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={styles.tableHeadText}>
                          Alueen ID
                        </TableCell>
                        <TableCell>{area.id}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                  <Table size="small" aria-label="areas">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={styles.tableHeadText}>
                          Kaupunginosa
                        </TableCell>
                        <TableCell sx={styles.tableHeadText}>Asunnot</TableCell>
                        <TableCell sx={styles.tableHeadText}>
                          Lainattu
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={area.id}>
                        <TableCell>{area.info.quarter}</TableCell>
                        <TableCell component="th" scope="row">
                          {area.info.buildings}
                        </TableCell>
                        <TableCell>
                          {area.shareState.isShared ? "Kyllä" : "Ei"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {area.info.misc ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={[styles.tableHeadText, styles.miscInfoHeadText]}
                          >
                            Lisätiedot:
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={styles.miscInfoHeadText}>
                            {area.info.misc}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <></>
                  )}

                  <Grid sx={styles.buttons}>
                    {!area.shareState.isShared ? (
                      loggedUser?.rank?.worker &&
                      !area.shareState.shareRequests.includes(
                        loggedUser.email
                      ) ? (
                        <Button
                          variant="contained"
                          sx={styles.areaButton}
                          onClick={() => {
                            loanArea(area);
                          }}
                        >
                          Lainaa Alue
                        </Button>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {area.shareState.sharedTo === loggedUser?.email ? (
                      <Button
                        variant="contained"
                        sx={styles.areaButton}
                        onClick={() => {
                          returnArea({
                            variables: {
                              areaId: area.id,
                            },
                          });
                        }}
                      >
                        Palauta Alue
                      </Button>
                    ) : (
                      <></>
                    )}
                    {loggedUser?.rank?.admin ? (
                      <>
                        <Button
                          variant="contained"
                          sx={styles.areaButton}
                          onClick={() => {
                            setOpenEdit(true);
                          }}
                        >
                          Muokkaa tietoja
                        </Button>
                        <Button
                          variant="contained"
                          sx={styles.areaButton}
                          onClick={() => setOpenDel(true)}
                        >
                          Poista alue
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </Fragment>
        <DeleteWarningModal {...delProps} />
        <EditAreaModal {...editProps} />
        <LendAreaModal {...lendProps} />
        <ReturnAreaModal {...returnProps} />
      </>
    );
  }
};
export default AreaTableRowComponent;
