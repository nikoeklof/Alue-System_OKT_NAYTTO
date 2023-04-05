import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { areas as initialAreas } from "./db/db";
import Main from "./Main";
import Login from "./Login";
import NavBar from "./components/NavBar";
import Register from "./Register";
import AreaControl from "./AreaControl";
import UserControl from "./UserControl";

const App = () => {
  const [areas, setAreas] = useState(initialAreas);

  return (
    <Router>
      <Container>
        <NavBar />
      </Container>
      <Routes>
        <Route path="/" element={<Main areas={areas} setAreas={setAreas} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/areaControl"
          element={<AreaControl areas={areas} setAreas={setAreas} />}
        />
        <Route path="/userControl" element={<UserControl />} />
      </Routes>
    </Router>
  );
};

export default App;
