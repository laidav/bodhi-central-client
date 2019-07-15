import React, { Component } from "react";
import authSrvc from "services/authSrvc";
import { Redirect, NavLink } from "react-router-dom";
import { validationTypes as vt, validatorSrvc } from "services/validatorSrvc";
import "./SignInForm.scss";

import "./SignInForm.scss";

class SignInForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const validationItems = {
      email: {
        value: email,
        validators: [vt.isRequired, vt.isValidEmail]
      },
      password: {
        value: password,
        validators: [vt.isRequired]
      }
    };

    const errors = validatorSrvc.validateItems(validationItems);

    if (Object.keys(errors).length) {
      this.setState({ errors });
      return;
    }

    authSrvc.signIn(this.state).then(
      response => {
        this.setState(this.state);
      },
      error => {
        this.setState({
          errors: {
            invalidCredentials: vt.invalidCredentials
          }
        });
      }
    );
  };

  render() {
    const isAuthenticated = authSrvc.isAuthenticated;
    const { email, password, errors } = this.state;
    const { handleChange, handleSubmit } = this;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <form className={"auth__form"} onSubmit={handleSubmit}>
        <div className={"auth__form-title"}>Sign in:</div>
        <div className={"control-group large"}>
          <input
            className={"control"}
            type="text"
            name="email"
            onChange={handleChange}
            value={email}
            placeholder={"Email"}
          />
          {errors.email && (
            <p className={"form-error"}>
              {errors.email === vt.isRequired && <span>Email is required</span>}
              {errors.email === vt.isValidEmail && (
                <span>Email format is invalid</span>
              )}
            </p>
          )}
        </div>
        <div className={"control-group large"}>
          <input
            className={"control large"}
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            placeholder={"Password"}
          />
          {errors.password && (
            <p className={"form-error"}>
              {errors.password === vt.isRequired && (
                <span>Password is required</span>
              )}
            </p>
          )}
        </div>

        <button className={"btn btn-primary"} type="submit">
          Sign in!
        </button>
        <p className={"auth__signup-login-toggle"}>
          New to BodhiCentral?{" "}
          <NavLink to={"/sign-up"}>Create an account.</NavLink>
        </p>
        {errors.invalidCredentials === vt.invalidCredentials && (
          <div className={"control-group"}>
            <p className={"form-error form-error--visible"}>
              Those credentials are invalid
            </p>
          </div>
        )}
      </form>
    );
  }
}

export default SignInForm;
