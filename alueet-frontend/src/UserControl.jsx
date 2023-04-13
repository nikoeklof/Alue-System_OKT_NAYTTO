import React, { Fragment, useState } from 'react';
import {
	Box,
	Button,
	Collapse,
	Container,
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
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import EditUserModal from './components/EditUserModal';
import DeleteWarningModal from './components/DeleteWarningModal';
import CreateUserModal from './components/CreateUserModal';

import theme from './style/theme';
import { users } from './db/db';

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
		m: 1,
	},
	form: {
		mt: 2,
		width: '100%',
		overflow: 'hidden',
	},
};

const columns = [
	{
		id: 'name',
		label: 'Nimi',
		minWidth: 120,
	},
	{
		id: 'email',
		label: 'Sähköposti',
		minWidth: 170,
	},
	{
		id: 'quest',
		label: 'Vieras',
		minWidth: 50,
		align: 'right',
	},
	{
		id: 'admin',
		label: 'Admin',
		minWidth: 50,
		align: 'right',
	},
	{
		id: 'id',
		label: 'ID',
		minWidth: 60,
		align: 'right',
	},
];

const Row = ({ ...rowProps }) => {
	const user = rowProps.user;
	const [open, setOpen] = useState(false);
	const areaArray = [];

	for (const area in user.areas) {
		areaArray.push(user.areas[area]);
	}

	return (
		<Fragment>
			<TableRow
				hover
				key={user.id}
				onClick={() => setOpen(!open)}
				sx={{ '& > *': { borderBottom: 'unset' } }}
			>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				</TableCell>
				<TableCell>{user.username}</TableCell>
				<TableCell>{user.email}</TableCell>
				<TableCell align='right'>
					{user.username ? 'Ei' : 'Kyllä'}
				</TableCell>
				<TableCell align='right'>
					{user.admin ? 'Kyllä' : 'Ei'}
				</TableCell>
				<TableCell align='right'>{user.id}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					sx={{ py: 0 }}
					colSpan={6}
				>
					<Collapse
						in={open}
						timeout='auto'
						unmountOnExit
					>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant='h6'
								gutterBottom
								component='div'
							>
								Alueet
							</Typography>
							<Table
								size='small'
								aria-label='areas'
							>
								<TableHead>
									<TableRow>
										<TableCell>Nimi</TableCell>
										<TableCell>ID</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{areaArray.map((area) => {
										return (
											<TableRow key={user.areas.id}>
												<TableCell
													component='th'
													scope='row'
												>
													Fetch from backend
												</TableCell>
												<TableCell>{area}</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
							<Button
								variant='contained'
								sx={styles.button}
								onClick={() => rowProps.setEditOpen(true)}
							>
								Muokkaa Käyttäjää
							</Button>
							<Button
								variant='contained'
								sx={styles.button}
								onClick={() => rowProps.setDelOpen(true)}
							>
								Poista Käyttäjä
							</Button>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

const UserControl = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openEdit, setEditOpen] = useState(false);
	const [openDel, setDelOpen] = useState(false);
	const [openCreate, setCreateOpen] = useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const editProps = {
		openEdit,
		handleEditModalClose: () => setEditOpen(false),
	};
	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		warningText: 'Haluatko varmasti poistaa käyttäjän?',
	};
	const createProps = {
		openCreate,
		handleCreateModalClose: () => setCreateOpen(false),
	};

	return (
		<Container sx={styles.container}>
			<Typography
				variant='h6'
				sx={styles.mainText}
			>
				Käyttäjien hallinta
			</Typography>
			<Button
				variant='contained'
				sx={styles.button}
				onClick={() => setCreateOpen(true)}
			>
				Luo Käyttäjä
			</Button>
			<Paper sx={styles.form}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table
						stickyHeader
						aria-label='sticky label'
					>
						<TableHead>
							<TableRow>
								<TableCell />
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{users
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((user) => {
									const rowProps = {
										user,
										setEditOpen,
										setDelOpen,
									};
									return (
										<Row
											key={user.id}
											{...rowProps}
										/>
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
			<EditUserModal {...editProps} />
			<DeleteWarningModal {...delProps} />
			<CreateUserModal {...createProps} />
		</Container>
	);
};

export default UserControl;
