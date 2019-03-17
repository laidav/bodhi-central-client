import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Auth from "./Auth/Auth";
import Home from "./Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PrivateRoute exact path="/" component={ Home } />
        <Route path="/login" component={ Auth } />
      </BrowserRouter>
    );
  }
}

export default App;
