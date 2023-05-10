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
import { useMutation, useQuery } from '@apollo/client';
import {
	ALL_USERS,
	TOGGLE_USER_ADMIN,
	CREATE_USER,
	DELETE_USER,
	EDIT_USER_EMAIL_AS_ADMIN,
	TOGGLE_USER_DISABLED,
	TOGGLE_USER_WORKER,
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
	const [allUsers, setAllUsers] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openCreate, setCreateOpen] = useState(false);
	const [checkedNotDisabled, setCheckedNotDisabled] = useState(false);
	const [userFilter, setUserFilter] = useState('');
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [userInputFilter, setUserInputFilter] = useState('');
	const [userList, setUserList] = useState([]);
	const [disabled, setDisabled] = useState(null);

	const { data: userData } = useQuery(ALL_USERS, {
		variables: { email: userFilter },
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const {
		data: dataUsers,
		loading: loadingUsers,
		refetch: refetchUsers,
	} = useQuery(ALL_USERS, {
		variables: { disabled: false },
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const {
		data: dataUsersDisabled,
		loading: loadingUsersDisabled,
		refetch: refetchUsersDisabled,
	} = useQuery(ALL_USERS, {
		variables: { disabled: true },
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const { data: dataAllUsers, refetch: refetchAllUsers } = useQuery(
		ALL_USERS,
		{
			onError: (e) => console.log(JSON.stringify(e, null, 2)),
		}
	);

	const [toggleUserAdmin] = useMutation(TOGGLE_USER_ADMIN, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [toggleUserWorker] = useMutation(TOGGLE_USER_WORKER, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [toggleUserDisabled] = useMutation(TOGGLE_USER_DISABLED, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [editUserEmailAsAdmin] = useMutation(EDIT_USER_EMAIL_AS_ADMIN, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [createUser] = useMutation(CREATE_USER, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [deleteUser] = useMutation(DELETE_USER, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		setUsers(dataUsers?.allUsers);
	}, [loadingUsers, dataUsers, filteredUsers]);
	useEffect(() => {
		setUsersDisabled(dataUsersDisabled?.allUsers);
	}, [loadingUsersDisabled, dataUsersDisabled, filteredUsers]);
	useEffect(() => {
		setAllUsers(dataAllUsers?.allUsers);
	}, [dataAllUsers, userInputFilter, allUsers]);

	useEffect(() => {
		setFilteredUsers(userData?.allUsers);
	}, [userData]);

	useEffect(() => {
		if (users && usersDisabled) {
			const usersList = [];
			if (allUsers) {
				allUsers.forEach((user) => {
					if (usersList.includes(user.email)) return;
					else usersList.push(user);
				});
			}
			return setUserList(usersList);
		}
		return;
	}, [users, usersDisabled, userList, allUsers]);
	useEffect(() => {
		if (filteredUsers) {
			const dis = filteredUsers.map((user) => user.rank.disabled);
			if (dis[0] === true) {
				setDisabled(true);
			} else if (dis[0] === false) {
				setDisabled(false);
			}
		}
	}, [userFilter, userList]);
	useEffect(() => {
		if (disabled === false) {
			setCheckedNotDisabled(true);
		} else if (disabled === true) {
			setCheckedNotDisabled(false);
		}
	}, [disabled, userInputFilter]);

	const refetchAll = async () => {
		await refetchUsers();
		await refetchUsersDisabled();
		await refetchAllUsers();
	};

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
		refetchAll();
	};

	const updateUserDisabled = async (user) => {
		const userId = user.id;
		await toggleUserDisabled({
			variables: { userId: userId },
		});
		refetchUsers();
		refetchUsersDisabled();
		refetchAllUsers();
	};

	const addUser = async (user) => {
		const { email, password } = user;
		await createUser({ variables: { password: password, email: email } });
		refetchAll();
	};

	const removeUser = async (user) => {
		const userId = user.id;
		const email = user.email;
		await deleteUser({
			variables: { userId: userId, email: email },
		});
		refetchAll();
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
		loadingUsersDisabled,
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
					userList.length !== 0
						? userList.map((user) => user.email)
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
			{users && !loadingUsers ? (
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
