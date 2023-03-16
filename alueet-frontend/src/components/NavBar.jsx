import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
	AppBar, 
	Toolbar,
	Container,
	Typography,
	Box,
	Menu,
	MenuItem,
	Button,
	IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'

import theme from '../theme';

const styles = {
	responsive: {
		box: {
			flexGrow: 1, 
			display: { xs: 'flex', md: 'none' }
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
			color: theme.color.primary
		},
		link: {
			textDecoration: 'none', 
			color: theme.color.secondary
		},
		menu: {
			sx: {
				display: { xs: 'block', md: 'none' }
			},
			transform: {
				vertical: 'top',
				horizontal: 'left',
			},
			anchor: {
				vertical: 'bottom',
				horizontal: 'left',
			}
		}
	},
	normal: {
		box: {
			flexGrow: 1, 
			display: { xs: 'none', md: 'flex' }
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
			color: theme.color.secondary
		},
		button: {
			my: 1, 
			display: 'block'
		}	
	},
	user: {
		box: {
			flexGrow: 0
		},
		button: {
			my: 1, 
			display: 'block'
		},
		menu: {
			sx: {
				mt: '45px'
			},
			transform: {
				vertical: 'top',
				horizontal: 'right'
			},
			anchor: {
				vertical: 'top',
				horizontal: 'right'
			}
		},
		link: {
			textDecoration: 'none', 
			color: theme.color.secondary
		}
	}
}

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

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
		<AppBar position='static' color='default'>
			<Container maxWidth='xl'>
				<Toolbar>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={styles.normal.logoText}
					>
						Aluepöytä
					</Typography>

					<Box sx={styles.responsive.box}>
						<IconButton size='large' onClick={handleOpenNavMenu} style={styles.responsive.icon}>
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
							<MenuItem onClick={handleCloseNavMenu}>
								<Link style={styles.responsive.link}>Lainaa</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link style={styles.responsive.link}>Palauta</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link to={'/arealist'} style={styles.responsive.link}>Alueiden hallinta</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link style={styles.responsive.link}>Käyttäjien hallinta</Link>
							</MenuItem>
						</Menu>
					</Box>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={styles.responsive.logoText}
					>
						Aluepöytä
					</Typography>
					<Box sx={styles.normal.box}>
						<Button
							onClick={handleCloseNavMenu}
							sx={styles.normal.button}
						>
							<Link style={styles.normal.link}>Lainaa</Link>
						</Button>
						<Button
							onClick={handleCloseNavMenu}
							sx={styles.normal.button}
						>
							<Link style={styles.normal.link}>Palauta</Link>
						</Button>
						<Button
							onClick={handleCloseNavMenu}
							sx={styles.normal.button}
						>
							<Link to='/areaControl' style={styles.normal.link}>Alueiden hallinta</Link>
						</Button>
						<Button
							onClick={handleCloseNavMenu}
							sx={styles.normal.button}
						>
							<Link style={styles.normal.link}>Käyttäjien hallinta</Link>
						</Button>
					</Box>
					<Box sx={styles.user.box}>
						<Button onClick={handleOpenUserMenu} sx={styles.user.link}>
							{/* Kirjautuneen käyttäjän nimi tänne */}
							Username
						</Button>
						<Menu
							sx={{  }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								
							}}
							keepMounted
							transformOrigin={{
								
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem >
								<Typography textAlign="center">Kirjaudu ulos</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>	
			</Container>
		</AppBar>
	);
}

export default NavBar;