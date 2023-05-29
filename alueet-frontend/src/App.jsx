import React, { useEffect, useState } from 'react';
import { Container, IconButton } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Main from './Main';
import Login from './Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AreaControl from './AreaControl';
import UserControl from './UserControl';
import AreaCreate from './components/AreaCreate';
import UserProfile from './UserProfile';
import LendList from './LendList';
import { Me } from './graphql/functions';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
		primary: {
			main: "#00001", 
		},
		secondary: {
		  main: "#bdbdbd", 
		},
    text: {
		  primary: "#bdbdbd", 
		},
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
		primary: {
			main: "#1976d2", 
		},
		secondary: {
		  main: "#00000",
		},
	text: {
		primary: '#000000', 
	  },
  },
});

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const user = Me({
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
  });



  useEffect(() => {
    const fakeUser = {
      id: 'testUserId',
      email: 'testuser@example.com',
      rank: {
        disabled: false,
        admin: true,
        worker: false,
      },
    };
    setLoggedUser(fakeUser);
  }, []);




  const handleThemeToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container sx={{ position: 'relative', minHeight: '100vh' }}>
          <NavBar user={loggedUser} darkMode={darkMode} />
          <Routes>
            <Route
              path="/"
              element={<Main user={!user.loading ? loggedUser : null} darkMode={darkMode} />}
            />
            <Route path="/login" element={<Login darkMode={darkMode} />} />
            <Route
              path="/areaControl"
              element={<AreaControl loggedUser={loggedUser} darkMode={darkMode} />}
            />
            <Route path="/userControl" element={<UserControl darkMode={darkMode} />} />
            <Route path="/createArea" element={<AreaCreate darkMode={darkMode} />} />
            <Route path="/lendList" element={<LendList darkMode={darkMode} />} />
            <Route
              path="/userProfile"
              element={<UserProfile user={!user.loading ? loggedUser : null} darkMode={darkMode} />}
            />
          </Routes>
          <Footer darkMode={darkMode} />
          <IconButton
            sx={{
              position: 'fixed',
              bottom: '0.2rem',
              left: '1rem',
              zIndex: theme.zIndex.tooltip,
            }}
            onClick={handleThemeToggle}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
