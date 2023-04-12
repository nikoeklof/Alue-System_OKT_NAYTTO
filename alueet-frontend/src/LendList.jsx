import React, { useState } from 'react';
import {
	Button,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';

import theme from './style/theme';

import DeleteWarningModal from './components/DeleteWarningModal';

const styles = {
	container: {
		mb: 8,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
	},
	button: {
		m: 0.5,
	},
};

const columns = [
	{
		id: 'email',
		label: 'Sähköposti',
		minWidth: 170,
	},
	{
		id: 'area',
		label: 'Alue',
		minWidth: 170,
	},
];

const LendList = ({ users }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openDel, setDelOpen] = useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		warningText: 'Haluatko varmasti hylätä lainaus pyynnön?',
	};

	return (
		<Container sx={styles.container}>
			<Typography
				variant='h6'
				sx={styles.mainText}
			>
				Lainauslista
			</Typography>
			<Paper sx={styles.form}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table
						stickyHeader
						aria-label='sticky label'
					>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
								<TableCell />
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{users
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((user) => {
									return (
										<TableRow key={user.id}>
											<TableCell
												style={{ minWidth: 170 }}
											>
												{user.email}
											</TableCell>
											<TableCell
												style={{ mindWidth: 170 }}
											>
												Fetch from backend
											</TableCell>
											<TableCell style={{ minWidth: 20 }}>
												<Button
													variant='contained'
													sx={styles.button}
												>
													Hyväksy
												</Button>
											</TableCell>
											<TableCell style={{ minWidth: 20 }}>
												<Button
													variant='contained'
													sx={styles.button}
													onClick={() =>
														setDelOpen(true)
													}
												>
													Hylkää
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50, 100]}
					component='div'
					count={users.length}
					rowsPerPage={rowsPerPage}
					page={page}
					labelRowsPerPage='Rivejä per sivu:'
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<DeleteWarningModal {...delProps} />
		</Container>
	);
};

export default LendList;
