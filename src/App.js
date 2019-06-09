import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import authSrvc from "./services/authSrvc";

import Auth from "./Auth/Auth";
import Main from "./Main/Main";

import "./App.scss";

class App extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    authSrvc.verifyToken().then(
      () => {
        this.setState({ loading: false });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    console.log(process.env);
    if (this.state.loading) {
      return <div>Loading</div>;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
