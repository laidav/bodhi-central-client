import React from 'react';
import './Main.scss';
import { Route } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute/PrivateRoute"
import Posts from "./Posts/Posts";
import Navbar from "./Navbar/Navbar"

function Main () {
  return (
    <div>
      <Navbar/>
      <PrivateRoute exact path="/" component={ Posts } />
    </div>
  );
}

export default Main;
