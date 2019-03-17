import React, { Component } from 'react';

import './LoginForm.scss';

class LoginForm extends Component {
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  state = {
    email: "",
    password: ""
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="login-email">Email:</label>
        <input id="login-email" type="text" name="email" onChange={this.handleChange} />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="text" name="password" onChange={this.handleChange} />
      </form>
    );
  }
}

export default LoginForm;
