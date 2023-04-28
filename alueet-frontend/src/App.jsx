import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import { ALL_USERS, ME } from "./queries";

const App = () => {
  const [users, setUsers] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const {
    data: dataUsers,
    loading: loadingUsers,
    refetch: refetchUsers,
  } = useQuery(ALL_USERS, {
    onError: (e) => console.error(e),
  });

  const { data: loggedUserData, loading: loadingUserData } = useQuery(ME);

  useEffect(() => {
    setUsers(dataUsers?.allUsers);
  }, [loadingUsers, dataUsers]);

  useEffect(() => {
    setLoggedUser(loggedUserData?.me);
  }, [loggedUser, loggedUserData]);

  return (
    <Router>
      <Container>
        <NavBar user={loggedUser ? loggedUser : null} />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/areaControl" element={<AreaControl />} />
          <Route
            path="/userControl"
            element={
              <UserControl
                users={users}
                setUsers={setUsers}
                refetch={refetchUsers}
              />
            }
          />
          <Route path="/createArea" element={<AreaCreate />} />
          <Route path="/lendList" element={<LendList users={users} />} />
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
