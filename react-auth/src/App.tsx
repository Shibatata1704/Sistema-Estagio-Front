import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { LoginUser } from "./components/login/LoginUser";
import { Home } from "./components/home/Home";
import { RequireAuth } from "react-auth-kit";
import { RegisterUser } from "./components/register/RegisterUser";
import { LoginOption } from "./components/LoginOption/LoginOption";
import { RegisterCompany } from "./components/register/RegisterCompany";
import { LoginCompany } from "./components/login/LoginCompany";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login/candidato">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login-option" element={<LoginOption />}></Route>
        <Route path="/login/candidato" element={<LoginUser />}></Route> 
        <Route path="/sign-up/usuario" element={<RegisterUser />}></Route>
        <Route path="/login/empresa" element={<LoginCompany />}></Route>
        <Route path="/sign-up/empresa" element={<RegisterCompany />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
