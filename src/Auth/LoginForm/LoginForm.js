import React, { Component } from "react";
import authSrvc from "../../services/authSrvc";
import { Redirect, NavLink } from "react-router-dom";
import { validationTypes as vt, validatorSrvc } from "services/validatorSrvc";
import "./LoginForm.scss";

import "./LoginForm.scss";

class LoginForm extends Component {
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
        validators: [vt.isRequired]
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
      <form className={"login-form"} onSubmit={handleSubmit}>
        <div className={"login-form__title"}>Login:</div>
        <div className={"control-group large"}>
          <input
            className={"control"}
            id="login-email"
            type="text"
            name="email"
            onChange={handleChange}
            value={email}
            placeholder={"Email"}
          />
          <p
            className={`form-error ${
              errors.email === vt.isRequired ? "form-error--visible" : ""
            }`}
          >
            Email is required
          </p>
        </div>
        <div className={"control-group large"}>
          <input
            className={"control large"}
            id="login-password"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            placeholder={"Password"}
          />
          <p
            className={`form-error ${
              errors.password === vt.isRequired ? "form-error--visible" : ""
            }`}
          >
            Password is required
          </p>
        </div>

        <button className={"btn btn-primary"} type="submit">
          Sign In!
        </button>
        <p className={"login-form__sign-up"}>
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

export default LoginForm;
