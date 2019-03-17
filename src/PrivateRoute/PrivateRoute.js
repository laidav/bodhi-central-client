import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import authSrvc from "../services/authSrvc"

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    authSrvc.isAuthenticated === true
    ? <Component {...props} />
    : <Redirect to="/sign-in" />
  )} />
)

export default PrivateRoute;