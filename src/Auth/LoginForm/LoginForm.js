import React, { Component } from "react";
import authSrvc from "../../services/authSrvc";
import { Redirect } from "react-router-dom";
import "./LoginForm.scss";

import "./LoginForm.scss";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    authSrvc.signIn(this.state).then(
      response => {
        this.setState(this.state);
      },
      error => {
        this.setState({ error: true });
      }
    );
  };

  render() {
    const isAuthenticated = authSrvc.isAuthenticated;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    let errorMsg;

    if (this.state.error) {
      errorMsg = <p>There was an error logging in</p>;
    }

    return (
      <form className={"login-form border"} onSubmit={this.handleSubmit}>
        <div className={"control-group"}>
          <label className={"sub-heading"} htmlFor="login-email">
            Email:
          </label>
          <input
            className={"control"}
            id="login-email"
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <p className={"form-error"}>&nbsp;</p>
        </div>
        <div className={"control-group"}>
          <label className={"sub-heading"} htmlFor="login-password">
            Password
          </label>
          <input
            className={"control"}
            id="login-password"
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <p className={"form-error"}>&nbsp;</p>
        </div>

        <button className={"btn btn-primary"} type="submit">
          Sign In!
        </button>
        {errorMsg}
      </form>
    );
  }
}

export default LoginForm;
