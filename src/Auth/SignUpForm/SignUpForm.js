import "./SignUpForm.scss";
import React, { Component } from "react";
import authResource from "services/resources/authResource";
import { Redirect, NavLink } from "react-router-dom";
import { validationTypes as vt, validatorSrvc } from "services/validatorSrvc";

class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
    successRedirect: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username, email, password, password2 } = this.state;

    const validationItems = {
      username: {
        value: username,
        validators: [vt.isRequired, vt.isValidUsername]
      },
      email: {
        value: email,
        validators: [vt.isRequired, vt.isValidEmail]
      },
      password: {
        value: password,
        validators: [vt.isRequired]
      },
      password2: {
        value: password2,
        validators: [vt.isRequired]
      }
    };

    const errors = validatorSrvc.validateItems(validationItems);

    if (Object.keys(errors).length) {
      this.setState({ errors });
      return;
    }

    const params = {
      data: {
        username,
        email,
        password,
        password2
      }
    };

    authResource.signUp(params).then(
      response => {
        this.setState({ successRedirect: true });
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
    const {
      username,
      email,
      password,
      password2,
      errors,
      successRedirect
    } = this.state;

    const { handleChange, handleSubmit } = this;

    if (successRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <form className={"auth__form"} onSubmit={handleSubmit}>
        <div className={"auth__form-title"}>Sign up:</div>
        <div className={"control-group large"}>
          <input
            className={"control"}
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
            placeholder={"Username"}
          />
          {errors.username && (
            <p className={"form-error"}>
              {errors.username === vt.isRequired && (
                <span>Username is required</span>
              )}
              {errors.username === vt.isValidUsername && (
                <span>Only letters, numbers, _ and dots please.</span>
              )}
            </p>
          )}
        </div>
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
        <div className={"control-group large"}>
          <input
            className={"control large"}
            type="password"
            name="password2"
            onChange={handleChange}
            value={password2}
            placeholder={"Repeat password"}
          />
          {errors.password2 && (
            <p className={"form-error"}>
              {errors.password2 === vt.isRequired && (
                <span>Password is required</span>
              )}
            </p>
          )}
        </div>

        <button className={"btn btn-primary"} type="submit">
          Sign up!
        </button>
        <p className={"auth__signup-login-toggle"}>
          Already a member? <NavLink to={"/login"}>Login.</NavLink>
        </p>
        {errors.invalidCredentials === vt.invalidCredentials && (
          <div className={"control-group"}>
            <p className={"form-error"}>The username already exists</p>
          </div>
        )}
      </form>
    );
  }
}

export default SignUpForm;
