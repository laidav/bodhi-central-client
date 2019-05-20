import React from "react";
import "./Auth.scss";
import LoginForm from "./LoginForm/LoginForm";

const Auth = () => (
  <div className={"container"}>
    <h1 className={"page-title"}>Welcome to BodhiCentral!</h1>
    <LoginForm />
  </div>
);

export default Auth;
