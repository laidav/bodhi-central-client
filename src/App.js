import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Auth from "./Auth/Auth";
import Main from "./Main/Main";
import PrivateRoute from "./common/PrivateRoute/PrivateRoute";


import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PrivateRoute exact path="/" component={ Main } />
        <Route path="/login" component={ Auth } />
      </BrowserRouter>
    );
  }
}

export default App;
