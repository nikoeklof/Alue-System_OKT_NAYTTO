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
import DeleteWarningModal from './DeleteWarningModal';

const styles = {
	button: {
		m: 1,
	},
};

const UserTableRowComponent = ({ user, updateUser }) => {
	const [open, setOpen] = useState(false);
	const [openEdit, setEditOpen] = useState(false);
	const [openDel, setDelOpen] = useState(false);

	const areaArray = [];

	for (const area in user.areas) {
		areaArray.push(user.areas[area]);
	}

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
													<TableCell>
														{area}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
								<Button
									variant='contained'
									sx={styles.button}
									onClick={() => setEditOpen(true)}
								>
									Muokkaa Käyttäjää
								</Button>
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
			<DeleteWarningModal {...delProps} />
		</>
	);
};

export default UserTableRowComponent;
