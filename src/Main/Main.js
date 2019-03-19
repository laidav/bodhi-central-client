import React from 'react';
import './Main.scss';
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute/PrivateRoute"
import Dukkhas from "./Dukkhas/Dukkhas";
import Home from "./Home/Home";

function Main () {
  return (
    <div>
      Main wrapper
      <Switch>
        <Route path="/home" component={ Home } />
        <PrivateRoute path="/dukkhas" component={ Dukkhas }/>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default Main;
