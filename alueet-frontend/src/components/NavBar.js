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


const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Aluepöytä
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="black"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							
							<MenuItem onClick={handleCloseNavMenu}>
								<Link>
									<Typography textAlign="center">Lainaa</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link>
									<Typography textAlign="center">Palauta</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link>
									<Typography textAlign="center">Alueiden hallinta</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link>
									<Typography textAlign="center">Käyttäjien hallinta</Typography>
								</Link>
							</MenuItem>
							
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Aluepöytä
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							<Link to='/login'>Lainaa</Link>
						</Button>
						<Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							<Link>Palauta</Link>
						</Button>
						<Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							<Link>Alueiden hallinta</Link>
						</Button>
						<Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							<Link>Käyttäjien hallinta</Link>
						</Button>
					</Box>
				</Toolbar>	
			</Container>
		</AppBar>
	);
}

export default NavBar;