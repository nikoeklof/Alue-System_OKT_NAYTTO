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
} from '@mui/material';
import React, { useState, Fragment, useEffect } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteWarningModal from './DeleteWarningModal';
import EditAreaModal from './EditAreaModal';
import LendAreaModal from './LendAreaModal';
import ReturnAreaModal from './ReturnAreaModal';
import theme from '../style/theme';

const styles = {
	areas: {
		flewGrow: 1,
	},
	selectMenu: {
		display: 'flex',
		flexWrap: 'wrap',
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
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
	},
	search: {
		mb: 2,
		ml: 2,
		width: '96%',
	},
	form: {
		width: '100%',
	},
	areainfo: {
		backgroundColor: theme.bgColor.primary,
		border: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		borderRadius: 1,
		display: 'flex',
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

const TableRowComponent = ({
	area,
	setSelectedArea,
	selectedArea,
	setHoverStatus,
	loanArea,
	removeArea,
	updateArea,
}) => {
	const [open, setOpen] = useState(false);
	const [openDel, setOpenDel] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openLend, setOpenLend] = useState(false);
	const [openReturn, setOpenReturn] = useState(false);

	const loaned = area.loaned;

	useEffect(() => {
		if (area.id !== selectedArea?.id) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [area.id, selectedArea?.id]);

	const delProps = {
		openDel,
		handleCloseDelModal: () => setOpenDel(false),
		warningText: 'Haluatko varmasti poistaa alueen?',
		handleConfirm: () => removeArea(area),
	};
	const editProps = {
		openEdit,
		handleCloseEditModal: () => setOpenEdit(false),
		handleConfirm: (updatedArea) => updateArea(updatedArea),
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
						hover={true}
						key={area.id}
						sx={{ '& > *': { borderBottom: 'unset' } }}
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
							{area.name}
						</TableCell>
						<TableCell>
							<IconButton
								aria-label='expand row'
								size='small'
								onClick={() => {
									setSelectedArea(open ? undefined : area);
								}}
							>
								{open ? <ExpandLess /> : <ExpandMore />}
							</IconButton>
						</TableCell>
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
										Info
									</Typography>
									<Table
										size='small'
										aria-label='areas'
									>
										<TableHead>
											<TableRow>
												<TableCell>Asunnot</TableCell>
												<TableCell>Lainattu</TableCell>
												<TableCell>ID</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow key={area.id}>
												<TableCell
													component='th'
													scope='row'
												>
													{area.buildings}
												</TableCell>
												<TableCell>
													{loaned ? 'Kyllä' : 'Ei'}
												</TableCell>
												<TableCell>{area.id}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									<Grid sx={styles.buttons}>
										<Button
											variant='contained'
											sx={styles.areaButton}
											onClick={() => {
												//setOpenLend(true)
												loanArea(area);
											}}
										>
											{area.loaned
												? 'Palauta alue'
												: 'Lainaa alue'}
										</Button>
										{/* <Button
                      variant="contained"
                      sx={styles.areaButton}
                      onClick={() => setOpenReturn(true)}
                    >
                      Palauta alue
                    </Button> */}
										<Button
											variant='contained'
											sx={styles.areaButton}
											onClick={() => {
												setOpenEdit(true);
											}}
										>
											Muokkaa tietoja
										</Button>
										<Button
											variant='contained'
											sx={styles.areaButton}
											onClick={() => setOpenDel(true)}
										>
											Poista alue
										</Button>
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
export default TableRowComponent;
