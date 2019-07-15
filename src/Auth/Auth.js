import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Auth.scss";
import SignUpForm from "./SignUpForm/SignUpForm";
import SignInForm from "./SignInForm/SignInForm";
import SignUpSuccess from "./SignUpSuccess/SignUpSuccess";
import BCLogo from "assets/bc-logo.svg";

const Auth = () => (
  <div className={"auth"}>
    <div className={"auth__content container"}>
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
          <Route path={"/sign-in"} component={SignInForm} />
          <Route path={"/sign-up"} component={SignUpForm} />
          <Route path={"/sign-up-success"} component={SignUpSuccess} />
        </Switch>
      </div>
    </div>
  </div>
);

export default Auth;
