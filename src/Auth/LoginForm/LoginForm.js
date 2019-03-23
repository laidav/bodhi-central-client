import React, { Component } from 'react';
import authSrvc from "../../services/authSrvc"
import { Redirect } from "react-router-dom";

import './LoginForm.scss';

class LoginForm extends Component {
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  state = {
    email: "",
    password: "",
    error: false
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    authSrvc.signIn(this.state).then((response) =>{
      this.setState(this.state);
    }, (error) => {
      this.setState({error: true});
    });
  }

  render() {

    const isAuthenticated = authSrvc.isAuthenticated;

    if(isAuthenticated) {
      return <Redirect to="/" />
    }

    let errorMsg;

    if(this.state.error) {
      errorMsg = <p>There was an error logging in</p>
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="login-email">Email:</label>
        <input id="login-email" type="text" name="email" onChange={this.handleChange} value={this.state.email} />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
        <button type="submit">Sign In!</button>
        { errorMsg }
      </form>
    );
  }
}

export default LoginForm;
