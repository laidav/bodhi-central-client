import React, { Component } from "react";
import "./SubjectTab.scss";


class SubjectTab extends Component {
  handleClick = this.handleClick.bind(this);

  handleClick () {
    const { clickHandler, value } = this.props;
    clickHandler(value)
  }

  render () {
    const { children, isActive } = this.props;

    return <li className={ `subject-tab${ isActive ? " subject-tab--active" : ""}` } onClick={ this.handleClick }>{ children }</li>
  }
}

export default SubjectTab