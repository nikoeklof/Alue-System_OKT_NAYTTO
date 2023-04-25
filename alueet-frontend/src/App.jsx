import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { users as initialUsers } from "./db/db";

import Main from "./Main";
import Login from "./Login";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AreaControl from "./AreaControl";
import UserControl from "./UserControl";
import AreaCreate from "./components/AreaCreate";
import UserProfile from "./UserProfile";
import LendList from "./LendList";

const App = () => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (props) => {
    setUsers([...users, props]);
    console.log(users);
  };

  return (
    <Router>
      <Container>
        <NavBar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />

          <Route path="/areaControl" element={<AreaControl />} />
          <Route
            path="/userControl"
            element={
              <UserControl
                users={users}
                addUser={addUser}
                setUsers={setUsers}
              />
            }
          />
          <Route path="/createArea" element={<AreaCreate />} />
          <Route path="/lendList" element={<LendList users={users} />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;
