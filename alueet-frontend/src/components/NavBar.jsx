import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Menu,
	MenuItem,
	Button,
	IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import theme from '../style/theme';

const styles = {
	responsive: {
		box: {
			flexGrow: 1,
			display: { xs: 'flex', md: 'none' },
		},
		logoText: {
			mr: 2,
			display: { xs: 'flex', md: 'none' },
			flexGrow: 1,
			fontFamily: 'monospace',
			color: theme.color.primary,
			textDecoration: 'none',
		},
		icon: {
			color: theme.color.primary,
		},
		link: {
			textDecoration: 'none',
			color: theme.color.secondary,
		},
		menu: {
			sx: {
				display: { xs: 'block', md: 'none' },
			},
			transform: {
				vertical: 'top',
				horizontal: 'left',
			},
			anchor: {
				vertical: 'bottom',
				horizontal: 'left',
			},
		},
	},
	normal: {
		box: {
			flexGrow: 1,
			display: { xs: 'none', md: 'flex' },
		},
		logoText: {
			mr: 2,
			display: { xs: 'none', md: 'flex' },
			color: theme.color.primary,
			fontFamily: 'monospace',
			textDecoration: 'none',
		},
		link: {
			textDecoration: 'none',
			color: theme.color.secondary,
		},
		button: {
			my: 1,
			display: 'block',
			color: theme.color.secondary,
		},
		menu: {
			anchor: {
				vertical: 'top',
				horizontal: 'right',
			},
			transform: {
				vertical: 'top',
				horizontal: 'right',
			},
			sx: {
				mt: '45px',
			},
		},
	},
	user: {
		box: {
			flexGrow: 0,
		},
		button: {
			my: 1,
			display: 'block',
		},
		menu: {
			sx: {
				mt: '45px',
			},
			transform: {
				vertical: 'top',
				horizontal: 'right',
			},
			anchor: {
				vertical: 'top',
				horizontal: 'right',
			},
		},
		link: {
			textDecoration: 'none',
			color: theme.color.secondary,
		},
	},
};

const NavBar = ({ loggedUser }) => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const user = loggedUser;

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar
			position='static'
			color='default'
		>
			<Box maxWidth='xl'>
				<Toolbar>
					<Link
						to={'/'}
						style={styles.normal.link}
					>
						<Typography
							variant='h5'
							noWrap
							sx={styles.normal.logoText}
						>
							Aluepöytä
						</Typography>
					</Link>

					<Box sx={styles.responsive.box}>
						<IconButton
							size='large'
							onClick={handleOpenNavMenu}
							style={styles.responsive.icon}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={styles.responsive.menu.anchor}
							keepMounted
							transformOrigin={styles.responsive.menu.transform}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={styles.responsive.menu.sx}
						>
							<Link
								to={'/areaControl'}
								style={styles.responsive.link}
							>
								<MenuItem onClick={handleCloseNavMenu}>
									Alueiden hallinta
								</MenuItem>
							</Link>
							<Link
								to={'/userControl'}
								style={styles.responsive.link}
							>
								<MenuItem onClick={handleCloseNavMenu}>
									Käyttäjien hallinta
								</MenuItem>
							</Link>
							<Link
								to={'/createArea'}
								style={styles.responsive.link}
							>
								<MenuItem onClick={handleCloseNavMenu}>
									Luo alue
								</MenuItem>
							</Link>
							<Link
								to={'/lendList'}
								style={styles.responsive.link}
							>
								<MenuItem onClick={handleCloseNavMenu}>
									Lainaa
								</MenuItem>
							</Link>
						</Menu>
					</Box>

					<Typography
						variant='h5'
						component='a'
						href='/'
						noWrap
						sx={styles.responsive.logoText}
					>
						Aluepöytä
					</Typography>
					<Box sx={styles.normal.box}>
						<Link
							to={'/areaControl'}
							style={styles.normal.link}
						>
							<Button sx={styles.normal.button}>
								Alueiden hallinta
							</Button>
						</Link>
						<Link
							to={'/userControl'}
							style={styles.normal.link}
						>
							<Button sx={styles.normal.button}>
								Käyttäjien hallinta
							</Button>
						</Link>
						<Link
							to={'/createArea'}
							style={styles.normal.link}
						>
							<Button sx={styles.normal.button}>Luo Alue</Button>
						</Link>
						<Link
							to={'/lendList'}
							style={styles.normal.link}
						>
							<Button sx={styles.normal.button}>Lainaa</Button>
						</Link>
					</Box>
					<Box sx={styles.user.box}>
						<Button
							onClick={handleOpenUserMenu}
							sx={styles.user.link}
						>
							{user ? user.username : 'Aloitus'}
						</Button>
						<Menu
							sx={styles.normal.menu.sx}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={styles.normal.menu.anchor}
							keepMounted
							transformOrigin={styles.normal.menu.transform}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{user ? (
								<Box>
									{}
									<Link
										to='/userProfile'
										style={styles.responsive.link}
									>
										<MenuItem>
											<Typography textAlign='center'>
												Profiili
											</Typography>
										</MenuItem>
									</Link>

									<MenuItem>
										<Typography textAlign='center'>
											Kirjaudu ulos
										</Typography>
									</MenuItem>
								</Box>
							) : (
								<Link
									to='/login'
									style={styles.responsive.link}
								>
									<MenuItem>
										<Typography>Kirjaudu sisään</Typography>
									</MenuItem>
								</Link>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Box>
		</AppBar>
	);
};

export default NavBar;
