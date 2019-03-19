import React, { Component } from 'react';
import './Dukkhas.scss';
import dukkhaResource from "../../services/resources/dukkhaResource";
import List from "../../common/List/List";
import DukkhaListItem from "./DukkhaListItem/DukkhaListItem"

class Dukkhas extends Component {
  state = {
    dukkhas: [],
    loading: true
  }

  componentWillMount() {
    dukkhaResource.getDukkhas().then((response) => {
      this.setState({
        dukkhas: response.data.dukkhas,
        loading: false
      });
    }, (error) => {
      console.log(error);
      this.setState({ loading: false });
    });
  }

  render() {

    if(this.state.loading) {
      return <div>loading</div>
    }

    return (
      <div>
        <div>Dukkhas!</div>
        <List className="dukkhas__wrapper" component={DukkhaListItem} uniqueKey="id" list={this.state.dukkhas} />
      </div>
    );
  }
}

export default Dukkhas;
