import React from "react";
// Components
import { SmallContainer } from "src/components/Container";
import logo from "src/assets/logo.png";

export const Welcome = () => (
  <SmallContainer>
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <h1>Bienvenido</h1>
      <img src={logo} alt="logo" width="300px" />
    </div>
  </SmallContainer>
);
