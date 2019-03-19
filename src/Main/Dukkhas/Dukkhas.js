import React, { Component } from 'react';
import './Dukkhas.scss';
import dukkhaResource from "../../services/resources/dukkhaResource";

class Dukkhas extends Component {
  state = {
    dukkhas: []
  }

  componentWillMount() {
    dukkhaResource.getDukkhas().then((response) => {
      this.setState({ dukkhas: response.data.dukkhas });
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>Dukkhas!</div>
    );
  }
}

export default Dukkhas;
