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
import { useMutation } from '@apollo/client';
import {
	TOGGLE_USER_ADMIN,
	EDIT_GUEST,
	CREATE_GUEST,
	CREATE_USER,
	DELETE_USER,
	DELETE_GUEST,
} from './queries';

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

const UserControl = ({ users, refetch }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openCreate, setCreateOpen] = useState(false);
	const [toggleUserAdmin] = useMutation(TOGGLE_USER_ADMIN, {
		onError: (e) => console.error(e),
	});
	const [editGuest] = useMutation(EDIT_GUEST, {
		onError: (e) => console.error(e),
	});
	const [createGuest] = useMutation(CREATE_GUEST, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [createUser] = useMutation(CREATE_USER, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [deleteGuest] = useMutation(DELETE_GUEST, {
		onError: (e) => console.error(e),
	});
	const [deleteUser] = useMutation(DELETE_USER, {
		onError: (e) => console.error(e),
	});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const updateUser = async (user) => {
		const { userId, guestId, email } = user;
		await toggleUserAdmin({
			variables: { userId: userId },
		});
		await editGuest({
			variables: {
				email: email,
				guestId: guestId,
			},
		});
		refetch();
	};

	const addUser = async (user) => {
		const { email, password } = user;
		await createGuest({ variables: { email: email } });
		await createUser({ variables: { password: password, email: email } });
		refetch();
	};

	const removeUser = async (user) => {
		const userId = user.id;
		const guestId = user.guestAccount.id;
		const email = user.guestAccount.id;
		await deleteGuest({ variables: { guestId: guestId, email: email } });
		await deleteUser({
			variables: { userId: userId, email: email, guestId: guestId },
		});
		refetch();
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
