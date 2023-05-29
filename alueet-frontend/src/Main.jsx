/* eslint-disable indent */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Container,
	Collapse,
	Typography,
	Grid,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Paper,
	IconButton,
	Box,
	Divider,
} from '@mui/material';
import {
	Map as MapIcon,
	Person as PersonIcon,
	Remove as RemoveIcon,
	Add as AddIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';



const styles = {
	container: {
		mb: 8,
	},
	mainText: {
		borderBottom: 'solid',
		borderWidth: 1,
		my: 4,
		pb: 2,
		fontFamily: 'Poppins',
	},
	subText: {
		pb: 1,
		fontFamily: 'Poppins',
	},
	listItem: {
		m: 0,
	},
	text: {
		my: 2,
		ml: 1,
	},
	box: {
		px: 2,
	},
	button: (theme) => ({
		m: 0.5,
		color: theme.palette.mode === 'dark' ? '#000000' : theme.palette.text.secondary,
		backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
		fontFamily: 'Poppins',
	  }),
	link: {
		textDecoration: 'none',
	},
	paper: {
		p: 1,
		mb: 1,
	},
	icon: {
		float: 'right',
	},
	divider: (theme) => ({
		borderColor: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.primary,
	  }),
	};

const Main = ({ user }) => {
	const theme = useTheme();
	console.log(theme.palette.secondary.main);
	const [areaControlChecked, setAreaControlChecked] = useState(false);
	const [userChecked, setUserChecked] = useState(false);
	const [createAreaChecked, setCreateAreaChecked] = useState(false);
	const [lendChecked, setLendChecked] = useState(false);
	const navigate = useNavigate();

	const logOut = () => {
		navigate('/');
		navigate(0);
	};

	return (
		<Container sx={styles.container}>
		 <Typography sx={{ ...styles.mainText, color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.primary,}} variant="h5">
				Tervetuloa
			</Typography>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					md={8}
					xs={12}
				>
					<Paper sx={styles.paper}>
						<Box
							onClick={() =>
								setAreaControlChecked(!areaControlChecked)
							}
						>
							<Typography
								variant='h6'
								sx={styles.subText}
							>
								Alueiden hallinta
								<IconButton sx={styles.icon}>
									{areaControlChecked ? (
										<RemoveIcon />
									) : (
										<AddIcon />
									)}
								</IconButton>
							</Typography>
						</Box>

						<Collapse in={areaControlChecked}>
							<Divider sx={styles.divider} />
							<Grid
								container
								sx={styles.box}
							>
								<Grid
									item
									md={12}
									xs={12}
								>
									<List>
										<ListItem sx={styles.listItem}>
											<ListItemIcon>
												<MapIcon />
											</ListItemIcon>
											<ListItemText primary='Tarkastele alueita' />
										</ListItem>
										{user ? (
											user.rank.admin === true ? (
												<ListItem>
													<ListItemIcon>
														<MapIcon />
													</ListItemIcon>
													<ListItemText primary='Muokkaa alueiden tietoja' />
												</ListItem>
											) : (
												''
											)
										) : (
											''
										)}
										{user ? (
											user.rank.worker === true &&
											user.rank.admin === false ? (
												<ListItem>
													<ListItemIcon>
														<MapIcon />
													</ListItemIcon>
													<ListItemText primary='Lainaa ja palauta alueita' />
												</ListItem>
											) : (
												''
											)
										) : (
											''
										)}
									</List>
								</Grid>
								<Grid
									item
									md={12}
									xs={12}
								>
									<Link
										to={'/areaControl'}
										style={styles.link}
									>
										<Button
											variant='contained'
											sx={styles.button(theme)}
										>
											Siirry
										</Button>
									</Link>
								</Grid>
							</Grid>
						</Collapse>
					</Paper>

					{user ? (
						user.rank.admin === true ? (
							<>
								<Paper sx={styles.paper}>
									<Box
										onClick={() =>
											setUserChecked(!userChecked)
										}
									>
										<Typography
											variant='h6'
											sx={styles.subText}
										>
											Käyttäjien hallinta
											<IconButton sx={styles.icon}>
												{userChecked ? (
													<RemoveIcon />
												) : (
													<AddIcon />
												)}
											</IconButton>
										</Typography>
									</Box>

									<Collapse in={userChecked}>
										<Divider sx={styles.divider} />
										<Grid
											container
											sx={styles.box}
										>
											<Grid
												item
												md={12}
												xs={12}
											>
												<List>
													<ListItem>
														<ListItemIcon>
															<PersonIcon />
														</ListItemIcon>
														<ListItemText primary='Tarkastele käyttäjiä' />
													</ListItem>
													<ListItem>
														<ListItemIcon>
															<PersonIcon />
														</ListItemIcon>
														<ListItemText primary='Luo käyttäjiä' />
													</ListItem>
													<ListItem>
														<ListItemIcon>
															<PersonIcon />
														</ListItemIcon>
														<ListItemText primary='Muokkaa ja poista käyttäjiä' />
													</ListItem>
												</List>
											</Grid>
											<Grid
												item
												md={12}
												xs={12}
											>
												<Link
													to={'/userControl'}
													style={styles.link}
												>
													<Button
														variant='contained'
														sx={styles.button(theme)}
													>
														Siirry
													</Button>
												</Link>
											</Grid>
										</Grid>
									</Collapse>
								</Paper>
								<Paper sx={styles.paper}>
									<Box
										onClick={() =>
											setCreateAreaChecked(
												!createAreaChecked
											)
										}
									>
										<Typography
											variant='h6'
											sx={styles.subText}
										>
											Luo alue
											<IconButton sx={styles.icon}>
												{createAreaChecked ? (
													<RemoveIcon />
												) : (
													<AddIcon />
												)}
											</IconButton>
										</Typography>
									</Box>

									<Collapse in={createAreaChecked}>
										<Divider sx={styles.divider} />
										<Grid
											container
											sx={styles.box}
										>
											<Grid
												item
												md={12}
												xs={12}
											>
												<List>
													<ListItem>
														<ListItemIcon>
															<MapIcon />
														</ListItemIcon>
														<ListItemText primary='Luo uusia alueita' />
													</ListItem>
												</List>
											</Grid>
											<Grid
												item
												md={12}
												xs={12}
											>
												<Link
													to={'/createArea'}
													style={styles.link}
												>
													<Button
														variant='contained'
														sx={styles.button(theme)}
													>
														Siirry
													</Button>
												</Link>
											</Grid>
										</Grid>
									</Collapse>
								</Paper>
								<Paper sx={styles.paper}>
									<Box
										onClick={() =>
											setLendChecked(!lendChecked)
										}
									>
										<Typography
											variant='h6'
											sx={styles.subText}
										>
											Lainaa
											<IconButton sx={styles.icon}>
												{lendChecked ? (
													<RemoveIcon />
												) : (
													<AddIcon />
												)}
											</IconButton>
										</Typography>
									</Box>

									<Collapse in={lendChecked}>
										<Divider sx={styles.divider} />
										<Grid
											container
											sx={styles.box}
										>
											<Grid
												item
												md={12}
												xs={12}
											>
												<List>
													<ListItem>
														<ListItemIcon>
															<MapIcon />
														</ListItemIcon>
														<ListItemText primary='Hallitse alueiden lainaus pyyntöjä' />
													</ListItem>
												</List>
											</Grid>
											<Grid
												item
												md={12}
												xs={12}
											>
												<Link
													to={'/lendList'}
													style={styles.link}
												>
													<Button
														variant='contained'
														sx={styles.button(theme)}
													>
														Siirry
													</Button>
												</Link>
											</Grid>
										</Grid>
									</Collapse>
								</Paper>
							</>
						) : (
							''
						)
					) : (
						''
					)}
				</Grid>
				<Grid
					item
					md={4}
					xs={12}
				>
					<Paper sx={styles.paper}>
						<Typography
							variant='h6'
							sx={styles.subText}
						>
							{!user ? 'Aloitus' : 'Lopetus'}
						</Typography>
						<Typography sx={styles.text}>
							{!user
								? 'Kirjaudu sisään, jotta saat sivun toiminnot käyttöösi!'
								: 'Valmis kaikkien muutosten kanssa?'}
						</Typography>
						{!user ? (
							<Link
								to={'/login'}
								style={styles.link}
							>
								<Button
									variant='contained'
									sx={styles.button(theme)}
								>
									Kirjaudu sisään
								</Button>
							</Link>
						) : (
							<Button
								onClick={() => {
									localStorage.setItem('token', '');
									return logOut();
								}}
								variant='contained'
								sx={styles.button(theme)}
							>
								Kirjaudu ulos
							</Button>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Main;
