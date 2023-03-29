import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import NavBar from "./components/NavBar";
import Register from "./Register";
import AreaControl from "./AreaControl";
import UserControl from "./UserControl";
import AreaMap from "./AreaMap";

const App = () => {
  return (
    <Router>
      <Container>
        <NavBar />
      </Container>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/areaControl" element={<AreaControl />} />
        <Route path="/userControl" element={<UserControl />} />
      </Routes>
      <AreaMap />
    </Router>
  );
};

export default App;
