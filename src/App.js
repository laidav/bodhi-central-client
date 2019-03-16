import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Auth from "./Auth/Auth";
import Home from "./Home/Home";


import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route path="/sign-in" component={ Auth } />
      </BrowserRouter>
    );
  }
}

export default App;
