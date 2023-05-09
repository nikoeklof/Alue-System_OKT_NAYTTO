import React, { useState, Fragment } from 'react';
import {
	Typography,
	Button,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import theme from '../style/theme';

const styles = {
	container: {
		mb: 8,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 7,
		mb: 2,
		pb: 2,
	},

	areaButton: {
		m: 0.5,
		ml: 5,
	},
	areaButtonRed: {
		m: 0.5,
		ml: 5,
		color: 'red',
	},
	pointer: {
		cursor: 'pointer',
	},
};

const LendListTableRowComponent = ({
	area,
	allowLoan,
	refetch,
	removeRequests,
	denyLoan,
}) => {
	const [open, setOpen] = useState(false);
	console.log(area);

	const handleAllowLoan = (area, email) => {
		allowLoan({ variables: { areaId: area, email: email } }).then(() => {
			removeRequests({ variables: { areaId: area } }).then(() => {
				refetch();
			});
		});
	};
	const handleDenyLoan = (area, email) => {
		denyLoan({ variables: { areaId: area, email: email } }).then(() => {
			refetch();
		});
	};
	return (
		<Fragment>
			<TableRow
				sx={{ width: '100%' }}
				hover
			>
				<TableCell
					onClick={() => setOpen(!open)}
					sx={styles.pointer}
				>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
					{area.info.address}
				</TableCell>
				<TableCell
					key={area.id}
					sx={{ minWidth: 620 }}
				>
					<Collapse
						in={open}
						timeout='auto'
						unmountOnExit
					>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell sx={{ p: 1, width: 250 }}>
										<Typography
											variant='h8'
											gutterBottom
											component='div'
										>
											Asunnot: {area.info.buildings}
										</Typography>
									</TableCell>
									<TableCell sx={{ p: 1, width: 250 }}>
										<Typography
											variant='h8'
											gutterBottom
											component='div'
										>
											Kaupunginosa: {area.info.quarter}
										</Typography>
									</TableCell>
									{area.info.misc ? (
										<TableCell sx={{ p: 1, width: 250 }}>
											<Typography
												variant='h8'
												gutterBottom
												component='div'
											>
												Lisätiedot: {area.info.misc}
											</Typography>
										</TableCell>
									) : (
										<></>
									)}
								</TableRow>
							</TableBody>
						</Table>
						<Table key={area.id[0]}>
							<TableHead>
								<TableRow>
									<TableCell sx={{ p: 1, width: 250 }}>
										<Typography
											variant='h6'
											gutterBottom
											component='div'
										>
											Lainauspyynnöt
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{area.shareState.shareRequests.map(
									(request, i) => {
										return (
											<TableRow
												key={i}
												sx={{ margin: 1, p: 2 }}
											>
												<TableCell
													sx={{
														margin: 0.5,
														padding: 0.5,
													}}
												>
													{request}
													<Button
														variant='contained'
														sx={styles.areaButton}
														onClick={() => {
															handleAllowLoan(
																area.id,
																request
															);
														}}
													>
														&#10003;
													</Button>
													<Button
														variant='contained'
														color='error'
														sx={styles.areaButton}
														onClick={() => {
															handleDenyLoan(
																area.id,
																request
															);
														}}
													>
														&#x292B;
													</Button>
												</TableCell>
											</TableRow>
										);
									}
								)}
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>

				<TableCell
					key={area.info.cityName}
					sx={{ alignSelf: 'right', width: 250 }}
				>
					{area.info.cityName}
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default LendListTableRowComponent;
