import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AreaControl from "./AreaControl";
import UserControl from "./UserControl";
import AreaCreate from "./components/AreaCreate";
import UserProfile from "./UserProfile";
import LendList from "./LendList";
import { useQuery } from "@apollo/client";
import { ME } from "./queries";

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null);

  const { data: loggedUserData, loading: loadingUserData } = useQuery(ME, {
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
  });

  useEffect(() => {
    setLoggedUser(loggedUserData?.me);
  }, [loggedUser, loggedUserData]);

  return (
    <Router>
      <Container>
        <NavBar user={loggedUser ? loggedUser : null} />

        <Routes>
          <Route
            path="/"
            element={<Main user={!loadingUserData ? loggedUser : null} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/areaControl"
            element={<AreaControl loggedUser={loggedUser} />}
          />
          <Route path="/userControl" element={<UserControl />} />
          <Route path="/createArea" element={<AreaCreate />} />
          <Route path="/lendList" element={<LendList />} />
          <Route
            path="/userProfile"
            element={
              <UserProfile user={!loadingUserData ? loggedUser : null} />
            }
          />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
};
export default App;
