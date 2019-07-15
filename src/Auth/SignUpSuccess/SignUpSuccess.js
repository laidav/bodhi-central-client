import React from "react";
import { NavLink } from "react-router-dom";

const SignUpSuccess = () => (
  <div className={"sign-up-success"}>
    <p>You have successfully created an account.</p>
    <p>Please check your email to activate your account.</p>
    <p>
      Then proceed to <NavLink to={"/sign-in"}>Login</NavLink>
    </p>
  </div>
);

export default SignUpSuccess;
