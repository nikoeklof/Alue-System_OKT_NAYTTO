import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Main from "./Main";
import Login from "./Login";
import { users as initialUsers } from "./db/db";
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
  const [users, setUsers] = useState(initialUsers);
  const { data, loading } = useQuery(ME);
  const user = {
    id: data?.me.guestAccount.id,
    admin: data?.me.admin,
    aboutMe: data?.me.aboutMe,
    email: data?.me.guestAccount.email,
    areas: data?.me.guestAccount.areas,
  };

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
            element={<UserControl users={users} setUsers={setUsers} />}
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
