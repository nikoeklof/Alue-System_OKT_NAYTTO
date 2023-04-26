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
  const {
    data: dataUsers,
    loading: loadingUsers,
    refetch: refetchUsers,
  } = useQuery(ALL_USERS, {
    onError: (e) => console.error(e),
  });

  const { data, loading } = useQuery(ME);
  const user = {
    id: data?.me?.guestAccount.id,
    admin: data?.me?.admin,
    aboutMe: data?.me?.aboutMe,
    email: data?.me?.guestAccount.email,
    areas: data?.me?.guestAccount.areas,
  };

  useEffect(() => {
    setUsers(dataUsers?.allUsers);
  }, [loadingUsers, dataUsers]);

  return (
    <Router>
      <Container>
        <NavBar user={user} />

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
            element={<UserProfile user={!loading ? user : null} />}
          />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
};
export default App;
