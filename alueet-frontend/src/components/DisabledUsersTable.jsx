import React, { useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { InfinitySpin } from "react-loader-spinner";

import DeleteWarningModal from "./DeleteWarningModal";
import UserTableRowComponent from "./UserTableRowComponent";

const DisabledUsersTable = ({ ...disabledProps }) => {
	const {
		usersDisabled,
		columns,
		styles,
		updateUserDisabled,
		removeUser,
		updateUser,
	} = disabledProps;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [open, setOpen] = useState(false);
	const [checkedDisabled, setCheckedDisabled] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const delProps = {
    openDel: open,
    handleCloseDelModal: () => setOpen(false),
    warningText: "Haluatko laittaa käyttäjän käyttöön?",
    handleConfirm: (user) => updateUserDisabled(user.id),
  };

  if (usersDisabled) {
    return (
      <>
        <Paper sx={styles.form}>
          <Box onClick={() => setCheckedDisabled(!checkedDisabled)}>
            <Typography variant="h6" sx={styles.subText}>
              Ei käytössä
              <IconButton sx={styles.icon}>
                {checkedDisabled ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </Typography>
          </Box>

					<Collapse
						in={checkedDisabled}
						timeout='auto'
						unmountOnExit
					>
						<Divider sx={styles.divider} />
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table
								stickyHeader
								aria-label='sticky label'
							>
								<TableHead>
									<TableRow>
										<TableCell style={{ maxWidth: 5 }} />
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{
													minWidth: column.minWidth,
												}}
											>
												{column.label}
											</TableCell>
										))}
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{usersDisabled
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((user) => {
											const rowProps = {
												user,
												updateUser,
												removeUser,
											};

                      return (
                        <UserTableRowComponent key={user.id} {...rowProps} />
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={usersDisabled.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Rivejä per sivu:"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Collapse>
        </Paper>
        <DeleteWarningModal {...delProps} />
      </>
    );
  } else {
    return (
      <div
        style={{
          marginLeft: "30%",
          marginTop: "15%",
          paddingBottom: "0px",
        }}
      >
        <InfinitySpin
          width="200"
          color="gray"
          wrapperStyle
          wrapperClass
          ariaLabel="loading"
        />
      </div>
    );
  }
};

export default DisabledUsersTable;
