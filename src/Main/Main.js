import React from 'react';
import './Main.scss';
import { Route } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute/PrivateRoute"
import Dukkhas from "./Dukkhas/Dukkhas";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar"

function Main () {
  return (
    <div>
      <Navbar/>
      <Route exact path="/" component={ Home } />
      <PrivateRoute path="/dukkhas" component={ Dukkhas }/>
    </div>
  );
}

export default Main;
