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

import UserTableRowComponent from './components/UserTableRowComponent';
import CreateUserModal from './components/CreateUserModal';

import theme from './style/theme';

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
		id: 'email',
		label: 'Sähköposti',
		minWidth: 170,
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

const UserControl = ({ users, addUser, setUsers }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openCreate, setCreateOpen] = useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const updateUser = (props) => {
		const userList = users;
		let userToUpdate = { ...props };
		userList.forEach((user, i) => {
			if (user.id === props.id) userList.splice(i, 1, userToUpdate);
		});
		setUsers([...userList]);
	};

	const removeUser = (props) => {
		const userList = [];
		users.forEach((user) => {
			if (user.id !== props.id) userList.push(user);
		});
		setUsers([...userList]);
	};

	const createProps = {
		openCreate,
		handleCreateModalClose: () => setCreateOpen(false),
		addUser,
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
										updateUser,
										removeUser,
									};

									return (
										<UserTableRowComponent
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
			<CreateUserModal {...createProps} />
		</Container>
	);
};

export default UserControl;
