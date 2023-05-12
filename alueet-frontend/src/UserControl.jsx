import React, { useEffect, useState } from 'react';
import {
	Button,
	Container,
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
	Box,
	Autocomplete,
	TextField,
} from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { InfinitySpin } from 'react-loader-spinner';

import DisabledUsersTable from './components/DisabledUsersTable';
import UserTableRowComponent from './components/UserTableRowComponent';
import CreateUserModal from './components/CreateUserModal';

import theme from './style/theme';
import { 
	GetAllUsers,
	ToggleUserAdmin,
	ToggleUserWorker,
	ToggleUserDisabled,
	CreateUser,
	DeleteUser,
	EditEmailAsAdmin
} from './graphql/functions'

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
	subText: {
		my: 1,
		pb: 1,
		px: 2,
	},
	button: {
		mt: 2,
		mx: 1,
	},
	form: {
		mt: 2,
		width: '100%',
		overflow: 'hidden',
	},
	divider: {
		borderColor: theme.bgColor.secondary,
	},
	icon: {
		float: 'right',
		pb: 2,
	},
};

const columns = [
	{
		id: 'email',
		label: 'Sähköposti',
		minWidth: 100,
	},
	{
		id: 'admin',
		label: 'Admin',
		minWidth: 100,
		align: 'right',
	},
	{
		id: 'worker',
		label: 'Työntekijä',
		minWidth: 100,
		align: 'right',
	},
	{
		id: 'id',
		label: 'ID',
		minWidth: 150,
		align: 'right',
	},
];

const UserControl = () => {
	const [users, setUsers] = useState(null);
	const [usersDisabled, setUsersDisabled] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openCreate, setCreateOpen] = useState(false);
	const [checkedNotDisabled, setCheckedNotDisabled] = useState(false);
	const [userFilter, setUserFilter] = useState('');
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [userInputFilter, setUserInputFilter] = useState('');
	const [disabled, setDisabled] = useState(null);

	const allUsers = GetAllUsers()

	const [toggleUserAdmin] = ToggleUserAdmin()
	const [toggleUserWorker] = ToggleUserWorker()
	const [toggleUserDisabled] = ToggleUserDisabled()
	const [editUserEmailAsAdmin] = EditEmailAsAdmin()
	const [createUser] = CreateUser()
	const [deleteUser] = DeleteUser()

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		setUsers(allUsers.data?.allUsers.filter(
			user => user.rank.disabled === false
		))
	}, [allUsers]);

	useEffect(() => {
		setUsersDisabled(allUsers.data?.allUsers.filter(
			user => user.rank.disabled === true
		))
	}, [allUsers]);

	useEffect(() => {
		setFilteredUsers(allUsers.data?.allUsers.filter(
			user => user.email === userFilter
		))
	}, [allUsers, userFilter]);
	
	useEffect(() => {
		if (filteredUsers?.length > 0) {
			setDisabled(filteredUsers[0].rank.disabled)
			setCheckedNotDisabled(!filteredUsers[0].rank.disabled)
		}
	}, [filteredUsers]);

	if (allUsers.loading) {
		return
	}
	const updateUser = async (user) => {
		const { userId, email, admin, worker, disabled, originalUser } = user;
		if (originalUser.rank.admin !== admin)
			await toggleUserAdmin({
				variables: { userId: userId },
			});
		if (originalUser.rank.worker !== worker)
			await toggleUserWorker({
				variables: { userId: userId },
			});
		if (originalUser.rank.disabled !== disabled)
			await toggleUserDisabled({
				variables: { userId: userId },
			});
		if (email !== originalUser.email)
			await editUserEmailAsAdmin({
				variables: {
					userId: userId,
					email: email,
				},
			});
	};

	const updateUserDisabled = async (user) => {
		const userId = user.id;
		await toggleUserDisabled({
			variables: { userId: userId },
		});
	};

	const addUser = async (user) => {
		const { email, password } = user;
		await createUser({ variables: { password: password, email: email } });
	};

	const removeUser = async (user) => {
		const userId = user.id;
		const email = user.email;
		await deleteUser({
			variables: { userId: userId, email: email },
		});
	};

	const createProps = {
		openCreate,
		handleCreateModalClose: () => setCreateOpen(false),
		addUser,
	};

	const disabledProps = {
		usersDisabled,
		userInputFilter,
		filteredUsers,
		userFilter,
		disabled,
		columns,
		styles,
		loading: allUsers.loading,
		updateUserDisabled,
		removeUser,
		updateUser,
	};

	return (
		<Container sx={styles.container}>
			<Typography
				variant='h5'
				sx={styles.mainText}
			>
				Käyttäjien hallinta
			</Typography>
			<Autocomplete
				freeSolo
				disableClearable
				id='findUser'
				options={
					allUsers.data.allUsers.length !== 0
						? allUsers.data.allUsers.map((user) => user.email)
						: ['Ei käyttäjiä']
				}
				value={userFilter}
				onChange={(e, newValue) => {
					if (newValue === '') {
						setUserFilter('');
						setFilteredUsers([]);
						return;
					}
					setUserFilter(newValue);
				}}
				inputValue={userInputFilter}
				onInputChange={(e, newValue) => {
					if (newValue === '') {
						setUserInputFilter('');
						setFilteredUsers([]);
						return;
					}
					setUserInputFilter(newValue);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Hae käyttäjää...'
						InputProps={{
							...params.InputProps,
							type: 'search',
						}}
					/>
				)}
			/>
			{users && !allUsers.loading ? (
				<Paper sx={styles.form}>
					<Box
						onClick={() =>
							setCheckedNotDisabled(!checkedNotDisabled)
						}
					>
						<Typography
							variant='h6'
							sx={styles.subText}
						>
							Aktiiviset käyttäjät
							<IconButton sx={styles.icon}>
								{checkedNotDisabled ? (
									<RemoveIcon />
								) : (
									<AddIcon />
								)}
							</IconButton>
						</Typography>
					</Box>

					<Collapse in={checkedNotDisabled}>
						<Divider sx={styles.divider} />

						{userInputFilter ? (
							filteredUsers ? (
								<>
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
															style={{
																minWidth:
																	column.minWidth,
																fontWeight:
																	'bold',
															}}
														>
															{column.label}
														</TableCell>
													))}
												</TableRow>
											</TableHead>
											<TableBody>
												{filteredUsers
													?.slice(
														page * rowsPerPage,
														page * rowsPerPage +
															rowsPerPage
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
										rowsPerPageOptions={[
											5, 10, 25, 50, 100,
										]}
										component='div'
										count={
											filteredUsers
												? filteredUsers?.length
												: 1
										}
										rowsPerPage={rowsPerPage}
										page={page}
										labelRowsPerPage='Rivejä per sivu:'
										onPageChange={handleChangePage}
										onRowsPerPageChange={
											handleChangeRowsPerPage
										}
									/>
								</>
							) : (
								<div
									style={{
										marginLeft: '30%',
										marginTop: '15%',
										paddingBottom: '0px',
									}}
								>
									<InfinitySpin
										width='200'
										color='gray'
										wrapperStyle
										wrapperClass
										ariaLabel='loading'
									/>
								</div>
							)
						) : users ? (
							<>
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
														style={{
															minWidth:
																column.minWidth,
															fontWeight: 'bold',
														}}
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
													page * rowsPerPage +
														rowsPerPage
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
									count={users ? users?.length : 1}
									rowsPerPage={rowsPerPage}
									page={page}
									labelRowsPerPage='Rivejä per sivu:'
									onPageChange={handleChangePage}
									onRowsPerPageChange={
										handleChangeRowsPerPage
									}
								/>
							</>
						) : (
							<div
								style={{
									marginLeft: '30%',
									marginTop: '15%',
									paddingBottom: '0px',
								}}
							>
								<InfinitySpin
									width='200'
									color='gray'
									wrapperStyle
									wrapperClass
									ariaLabel='loading'
								/>
							</div>
						)}
					</Collapse>
				</Paper>
			) : (
				<div
					style={{
						marginLeft: '30%',
						marginTop: '15%',
						paddingBottom: '0px',
					}}
				>
					<InfinitySpin
						width='200'
						color='gray'
						wrapperStyle
						wrapperClass
						ariaLabel='loading'
					/>
				</div>
			)}
			<DisabledUsersTable {...disabledProps} />
			<Button
				variant='contained'
				sx={styles.button}
				onClick={() => setCreateOpen(true)}
			>
				Luo Käyttäjä
			</Button>
			<CreateUserModal {...createProps} />
		</Container>
	);
};

export default UserControl;
