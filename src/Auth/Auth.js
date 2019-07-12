import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Auth.scss";
import SignUpForm from "./SignUpForm/SignUpForm";
import LoginForm from "./LoginForm/LoginForm";
import BCLogo from "assets/bc-logo.svg";

const Auth = () => (
  <div className={"auth"}>
    <div className={"auth__hero-container"}>
      <div
        className={"auth__logo"}
        style={{ backgroundImage: `url(${BCLogo})` }}
      />
      <p className={"auth__welcome-msg"}>Welcome To</p>
      <p className={"auth__company-title"}>BodhiCentral</p>
      <p>Learn the Dhamma and record your practice here!</p>
    </div>
    <div className={"auth__form-container"}>
      <Switch>
        <Route path={"/login"} component={LoginForm} />
        <Route path={"/sign-up"} component={SignUpForm} />
      </Switch>
    </div>
  </div>
);

export default Auth;
