import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { areas as initialAreas, users } from "./db/db";
import { InfinitySpin } from "react-loader-spinner";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AreaControl from "./AreaControl";
import UserControl from "./UserControl";
import AreaCreate from "./components/AreaCreate";
import UserProfile from "./UserProfile";
import LendList from "./LendList";
import { useQuery } from "@apollo/client";
import { ALL_AREAS } from "./queries";
const App = () => {
  const { loading, error, data } = useQuery(ALL_AREAS);

  const [areas, setAreas] = useState(data?.allAreas);
  console.log(areas);
  const [layerContext, setLayerContext] = useState(null);
  const addArea = (props) => {
    setAreas([...areas, props]);
  };
  useEffect(() => {
    setAreas(data?.allAreas);
  }, [loading, data]);

  return (
    <Router>
      <Container>
        <NavBar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/areaControl"
            element={
              !areas ? (
                <div style={{ position: "initial", top: "40%", left: "45%" }}>
                  <InfinitySpin
                    width="400"
                    color="black"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                </div>
              ) : (
                <AreaControl areas={areas} setAreas={setAreas} />
              )
            }
          />
          <Route path="/userControl" element={<UserControl />} />
          <Route
            path="/createArea"
            element={
              !areas ? (
                <div style={{ position: "absolute", top: "50%", left: "50%" }}>
                  <InfinitySpin
                    width="200"
                    color="gray"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                </div>
              ) : (
                <AreaCreate
                  areas={areas}
                  addArea={addArea}
                  setLayerContext={setLayerContext}
                  layerContext={layerContext}
                />
              )
            }
          />
          <Route path="/lendList" element={<LendList users={users} />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;
