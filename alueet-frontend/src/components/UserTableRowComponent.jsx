/* eslint-disable indent */
import React, { Fragment, useState } from 'react';
import {
	Box,
	Button,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import EditUserModal from './EditUserModal';
import ChangeDisabledModal from './ChangeDisabledModal';
import DeleteWarningModal from './DeleteWarningModal';

const styles = {
	button: {
		m: 1,
	},
};

const UserTableRowComponent = ({
	user,
	updateUser,
	removeUser,
	updateUserDisabled,
}) => {
	const [open, setOpen] = useState(false);
	const [openEdit, setEditOpen] = useState(false);
	const [openDel, setDelOpen] = useState(false);
	const [openChangeDisabled, setOpenChangeDisabled] = useState(false);

	const editProps = {
		openEdit,
		handleEditModalClose: () => setEditOpen(false),
		handleConfirm: (updatedUser) => updateUser(updatedUser),
		originalUser: user,
	};
	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		warningText: 'Haluatko varmasti poistaa käyttäjän?',
		handleConfirm: () => removeUser(user),
	};
	const changeDisabledProps = {
		openChangeDisabled,
		handleCloseChangeDisabledModal: () => setOpenChangeDisabled(false),
		originalUser: user,
		updateUserDisabled,
	};

	return (
		<>
			<Fragment>
				<TableRow
					hover
					key={user.id}
					onClick={() => setOpen(!open)}
					sx={{ '& > *': { borderBottom: 'unset' } }}
				>
					<TableCell style={{ maxWidth: 5 }}>
						<IconButton
							aria-label='expand row'
							size='small'
							onClick={() => setOpen(!open)}
						>
							{open ? <ExpandLess /> : <ExpandMore />}
						</IconButton>
					</TableCell>
					<TableCell>{user.email}</TableCell>
					<TableCell align='right'>
						{user.rank.admin ? 'Kyllä' : 'Ei'}
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
								{!user.rank.disabled ? (
									<>
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
												{user.areas
													? user.areas.map((area) => {
															return (
																<TableRow
																	key={
																		area.id
																	}
																>
																	<TableCell
																		component='th'
																		scope='row'
																	>
																		{
																			area
																				.info
																				.quarter
																		}
																	</TableCell>
																	<TableCell>
																		{
																			area.id
																		}
																	</TableCell>
																</TableRow>
															);
															// eslint-disable-next-line no-mixed-spaces-and-tabs
													  })
													: ''}
											</TableBody>
										</Table>
									</>
								) : (
									''
								)}
								{!user.rank.disabled ? (
									<Button
										variant='contained'
										sx={styles.button}
										onClick={() => setEditOpen(true)}
									>
										Muokkaa Käyttäjää
									</Button>
								) : (
									<Button
										variant='contained'
										sx={styles.button}
										onClick={() =>
											setOpenChangeDisabled(true)
										}
									>
										Aktivoi käyttäjä
									</Button>
								)}
								<Button
									variant='contained'
									sx={styles.button}
									onClick={() => setDelOpen(true)}
								>
									Poista Käyttäjä
								</Button>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</Fragment>
			<EditUserModal {...editProps} />
			<ChangeDisabledModal {...changeDisabledProps} />
			<DeleteWarningModal {...delProps} />
		</>
	);
};

export default UserTableRowComponent;
