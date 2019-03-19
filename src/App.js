import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "./Auth/Auth";
import Main from "./Main/Main";

import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Auth } />
          <Route path="/" component={ Main } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
