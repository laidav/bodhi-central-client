import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Auth.scss";
import SignUpForm from "./SignUpForm/SignUpForm";
import LoginForm from "./LoginForm/LoginForm";

const Auth = () => (
  <div className={"auth"}>
    <div className={"auth__hero-container"} />
    <div className={"auth__form-container"}>
      <Switch>
        <Route path={"/login"} component={LoginForm} />
        <Route path={"/sign-up"} component={SignUpForm} />
      </Switch>
    </div>
  </div>
);

export default Auth;
